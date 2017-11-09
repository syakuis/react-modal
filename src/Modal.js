import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ModalComponent from '_components/Modal';
import Overlay from '_components/Overlay';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,

  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  isCloseButton: PropTypes.bool,
  isOverlay: PropTypes.bool,

  zIndex: PropTypes.number,

  beforeOpen: PropTypes.func,
  afterOpen: PropTypes.func,
  doneClose: PropTypes.func,
};

const defaultProps = {
  id: null,
  isOpen: false,
  onRequestClose: null,
  isCloseButton: true,
  isOverlay: true,

  zIndex: null,

  beforeOpen: null,
  afterOpen: null,
  doneClose: null,
};

const modal = document.getElementById('react-modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id ? props.id : shortid.generate();
    this.ele = document.createElement('div');

    this.beforeOpen = props.isOpen;
    this.afterOpen = props.isOpen;
    this.doneClose = !props.isOpen;

    this.onRequestClose = this.onRequestClose.bind(this);
    this.onEscClose = this.onEscClose.bind(this);
  }

  componentWillMount() {
    this.onEventBeforeOpen(this.props);
    this.onEventAfterOpen(this.props);
    this.onEventDoneClose(this.props);
  }

  componentDidMount() {
    modal.appendChild(this.ele);
    this.ele.addEventListener('keydown', this.onEscClose);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.isOpen) {
      this.beforeOpen = false;
      this.afterOpen = false;
    } else {
      this.doneClose = false;
    }
  }

  componentWillUpdate(nextProps) {
    this.onEventBeforeOpen(nextProps);
  }

  componentDidUpdate() {
    this.onEventAfterOpen(this.props);
    this.onEventDoneClose(this.props);
  }

  componentWillUnmount() {
    this.ele.removeEventListener('keydown', this.onEscClose);
    modal.removeChild(this.ele);
  }

  onRequestClose() {
    if (typeof this.props.onRequestClose === 'function') this.props.onRequestClose();
  }

  onEscClose(e) {
    if (e.keyCode === 27) this.onRequestClose();
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

  render() {
    return ReactDOM.createPortal(
      [
        this.props.isOverlay && this.props.isOpen ? <Overlay
          key="reactModalOverlay"
          zIndex={this.props.zIndex}
        /> : null,
        this.props.isOpen ?
          <ModalComponent
            {...this.props}
            onRequestClose={this.onRequestClose}
            key="reactModal"
          >
            {this.props.children}
          </ModalComponent> :
          null,
      ],
      this.ele,
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
