import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Overlay from '_components/Overlay';

const doc = document;
const docBody = doc.body;
let reactModalOverlay = doc.getElementById('react-modal');
if (!reactModalOverlay) {
  reactModalOverlay = doc.createElement('div');
  reactModalOverlay.setAttribute('id', 'react-modal');

  docBody.insertBefore(
    reactModalOverlay,
    docBody.hasChildNodes() ? docBody.childNodes[0] : null,
  );
}

// const getName = (fn) => {
//   // ie 에서 type(func or class).name 은 undefined 이다.
//   if (fn.name) return fn.name;
//   return fn.toString().match(/^function\s*([^\s(]+)/)[1];
// };

const propTypes = {
  isOverlay: PropTypes.bool,
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.shape({}),
  zIndex: PropTypes.number,
};

const defaultProps = {
  isOverlay: true,
  overlayClassName: null,
  overlayStyle: null,
  zIndex: 3000,
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
    reactModalOverlay.appendChild(this.ele);
  }

  componentWillReceiveProps(nextProps) {
    this.setChildren(nextProps);
  }

  componentWillUnmount() {
    reactModalOverlay.removeChild(this.ele);
  }

  onModalSelect(id) {
    this.setState({ selectId: id });
  }

  setChildren(props) {
    let openCount = 0;

    this.Children = React.Children.map(props.children, (children, index) => {
      // console.log(getName(children.type));
      // if (getName(children.type) === 'Modal') {
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
      // }
      // return children;
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
      if (!children.props) return children;
      // console.log(children.props.componentName);
      // console.log(getName(children.type));
      const { componentName } = children.props;
      if (componentName === 'Modal') {
        const zIndex = children.props.id === this.state.selectId ?
          this.zIndexTop() : this.props.zIndex;

        return React.cloneElement(children, {
          ...children.props,
          zIndex,
          isScrollbar: false,
        });
      }

      return children;
    });

    return ReactDOM.createPortal(
      <div>
        {
          this.props.isOverlay && this.state.overlay ?
            <Overlay
              overlayClassName={this.props.overlayClassName}
              overlayStyle={this.props.overlayStyle}
              key="reactGroupModalOverlay"
              zIndex={this.props.zIndex}
            /> : null
        }
        {Children}
      </div>,
      this.ele,
    );
  }
}

GroupModal.propTypes = propTypes;
GroupModal.defaultProps = defaultProps;

export default GroupModal;
