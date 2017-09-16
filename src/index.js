/**
 * Modal Component
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 31.
 */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ModalDOM from '_components/ModalDOM';
import ModalComponent from '_components/Modal';

const propTypes = {
  group: PropTypes.string,
  isOverlay: PropTypes.bool,

  // afterOpen: PropTypes.func,
  // beforeOpen: PropTypes.func,
  // doneClose: PropTypes.func,
};

const defaultProps = {
  group: undefined,
  isOverlay: true,

  // afterOpen: null,
  // beforeOpen: null,
  // doneClose: null,
};

class Modal extends Component {
  constructor(props) {
    super(props);

    this.id = shortid.generate();
    this.group = props.group ? props.group : shortid.generate();
    this.modalDOM = new ModalDOM(this.group, this.id, props.isOverlay);

    this.rootNode = null;
    this.modalNode = null;

    this.onModalUpdate = this.onModalUpdate.bind(this);
    this.onModalSelect = this.onModalSelect.bind(this);

    this.beforeOpen = false;
    this.afterOpen = false;
    this.doneClose = true;
  }

  componentWillMount() {
    this.onEventBeforeOpen(this.props);
  }

  componentDidMount() {
    this.rootNode = this.modalDOM.getRootNode();
    this.modalNode = this.modalDOM.getModalNode();
    this.renderModal(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.isOpen) {
      this.beforeOpen = false;
      this.afterOpen = false;
    } else {
      this.doneClose = false;
    }
    this.onEventBeforeOpen(newProps);
    this.renderModal(newProps);
    this.onEventDoneClose(newProps);
  }

  componentDidUpdate() {
    this.renderModal(this.props);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.rootNode);
    this.modalDOM.destroy();
  }

  onModalUpdate(isDid) {
    this.modalDOM.update();
    if (isDid) {
      this.onEventAfterOpen(this.props);
    }
  }

  onModalSelect() {
    this.modalDOM.zIndexUpdate(this.group, this.id);
  }

  onEventBeforeOpen(props) {
    if (!props.isOpen || this.beforeOpen || typeof props.beforeOpen !== 'function') return;
    props.beforeOpen();
    this.beforeOpen = true;
  }

  onEventAfterOpen(props) {
    if (!props.isOpen || this.afterOpen || typeof props.afterOpen !== 'function') return;
    props.afterOpen();
    this.afterOpen = true;
  }

  onEventDoneClose(props) {
    if (props.isOpen || this.doneClose || typeof props.doneClose !== 'function') return;
    props.doneClose();
    this.doneClose = true;
  }

  renderModal(props) {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <ModalComponent
        {...props}
        id={this.id}
        onModalUpdate={this.onModalUpdate}
        onModalSelect={this.onModalSelect}
      />,
      this.modalNode,
    );
  }

  render() {
    return null;
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
