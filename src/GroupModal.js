import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Overlay from '_components/Overlay';

const propTypes = {
  isOverlay: PropTypes.bool,
  zIndex: PropTypes.number,
};

const defaultProps = {
  isOverlay: true,
  zIndex: null,
};

const modal = document.getElementById('react-modal-overlay');

const getName = (fn) => {
  // ie 에서 type(func or class).name 은 undefined 이다.
  if (fn.name) return fn.name;
  return fn.toString().match(/^function\s*([^\s(]+)/)[1];
};

class GroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.ele = document.createElement('div');

    this.Children = null;
    this.id = [];

    this.state = {
      overlay: false,
      selectId: null,
    };

    this.onModalSelect = this.onModalSelect.bind(this);
  }

  componentWillMount() {
    this.setChildren(this.props);
  }

  componentDidMount() {
    modal.appendChild(this.ele);
  }

  componentWillReceiveProps(nextProps) {
    this.setChildren(nextProps);
  }

  componentWillUnmount() {
    modal.removeChild(this.ele);
  }

  onModalSelect(id) {
    this.setState({ selectId: id });
  }

  setChildren(props) {
    let openCount = 0;

    this.Children = React.Children.map(props.children, (children, index) => {
      if (getName(children.type) === 'Modal') {
        if (children.props.isOpen) openCount += 1;
        if (!this.id[index]) {
          this.id[index] = shortid.generate();
        }

        return React.cloneElement(children, {
          onModalSelect: this.onModalSelect,
          isOverlay: false,
          zIndex: this.zIndex,
          id: this.id[index],
        });
      }
      return children;
    });

    if (openCount > 0) {
      this.setState({ overlay: true });
    } else {
      this.setState({ overlay: false });
    }
  }

  zIndexTop() {
    return this.props.zIndex !== null ? this.props.zIndex + 1 : 1;
  }

  render() {
    const Children = React.Children.map(this.Children, (children) => {
      if (getName(children.type) === 'Modal') {
        const zIndex = children.props.id === this.state.selectId ?
          this.zIndexTop() : this.props.zIndex;
        return React.cloneElement(children, {
          ...children.props,
          zIndex,
        });
      }
      return children;
    });

    return ReactDOM.createPortal(
      [
        this.props.isOverlay && this.state.overlay ? <Overlay key="reactGroupModalOverlay" zIndex={this.props.zIndex} /> : null,
        Children,
      ],
      this.ele,
    );
  }
}

GroupModal.propTypes = propTypes;
GroupModal.defaultProps = defaultProps;

export default GroupModal;
