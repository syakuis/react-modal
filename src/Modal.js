/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 11. 16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ModalComponent from '_components/Modal';
import Overlay from '_components/Overlay';

const doc = document;
const docBody = doc.body;

let reactModal = doc.getElementById('react-modal');
if (!reactModal) {
  reactModal = doc.createElement('div');
  reactModal.setAttribute('id', 'react-modal');

  docBody.insertBefore(
    reactModal,
    docBody.hasChildNodes() ? docBody.childNodes[0] : null,
  );
}

let selectId = null;
let modalData = [];

// 여러 모달중 마지막에 열린 모달 정보를 배열 첫번째에 담음.
// 만약 닫힌 모달이면 배열에서 제거한다.
const modalOpenTop = (isOpen, id) => {
  if (isOpen && modalData.indexOf(id) === -1) {
    modalData.unshift(id);

    if (modalData.length === 0) {
      selectId = null;
    } else if (modalData[0] === id) {
      selectId = id;
    }
  }
};

const modalCloseTop = (isOpen, id) => {
  if (!isOpen && modalData.indexOf(id) > -1) {
    modalData = modalData.filter(item => id !== item);
    const modalId = modalData[0];
    selectId = modalId;
  }
};

// 모달을 선택한 데이터를 배열 첫번째로 이동되게 갱신한다.
const modalSelect = (id) => {
  if (modalData.indexOf(id) > -1) {
    modalData = modalData.filter(item => id !== item);
  }
  if (modalData.indexOf(id) === -1) modalData.unshift(id);
  selectId = id;
};

// selectId 정보를 이용하여 모든 모달의 zIndex 를 갱신한다.
const zIndexUpdate = (zIndex) => {
  const modalNode = Array.from(reactModal.querySelectorAll('[data-modal]'));
  const zIndexNew = zIndex === null ? 1 : zIndex + 1;

  modalNode.forEach((ele) => {
    const node = reactModal.querySelector(`[data-modal=${ele.dataset.modal}]`);
    if (node) {
      node.style.zIndex = zIndex;
    }
    if (selectId === ele.dataset.modal) {
      node.style.zIndex = zIndexNew;
    }
  });
};

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  onModalSelect: PropTypes.func,

  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  isCloseButton: PropTypes.bool,
  isEscClose: PropTypes.bool,
  isOverlay: PropTypes.bool,
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.shape({}),

  zIndex: PropTypes.number,

  beforeOpen: PropTypes.func,
  afterOpen: PropTypes.func,
  doneClose: PropTypes.func,
};

const defaultProps = {
  id: null,
  onModalSelect: null,

  isOpen: false,
  onRequestClose: null,
  isEscClose: true,
  isCloseButton: true,
  isOverlay: true,
  overlayClassName: null,
  overlayStyle: null,

  zIndex: 3000,

  beforeOpen: null,
  afterOpen: null,
  doneClose: null,
};

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id ? props.id : shortid.generate();
    this.num = null;
    this.ele = document.createElement('div');
    this.ele.setAttribute('data-modal', this.id);
    this.ele.style.zIndex = props.zIndex;
    this.ele.style.position = 'absolute';

    this.beforeOpenOnce = false;
    this.afterOpenOnce = false;
    this.doneCloseOnce = false;

    this.onModalSelect = this.onModalSelect.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.isEventListener = false;
    this.isEventListenerName = shortid.generate();
    this.onEscClose = this.onEscClose.bind(this);
  }

  componentWillMount() {
    modalOpenTop(this.props.isOpen, this.id);
    this.onEventBeforeOpen(this.props);
  }

  componentDidMount() {
    reactModal.appendChild(this.ele);
    this.onEventAfterOpen(this.props);

    if (this.props.isEscClose &&
        this.props.isOpen && !this.isEventListener && modalData[0] === this.id) {
      window.addEventListener('keydown', this.onEscClose);
      this.isEventListener = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    modalOpenTop(nextProps.isOpen, this.id);
    zIndexUpdate(nextProps.zIndex);

    this.onEventBeforeOpen(nextProps);
    if (this.props.isOpen && !nextProps.isOpen) this.onEventDoneClose(nextProps);
  }

  componentWillUpdate(nextProps) {
    modalCloseTop(nextProps.isOpen, this.id);
  }

  componentDidUpdate() {
    this.onEventAfterOpen(this.props);

    if (this.props.isEscClose) {
      window.removeEventListener('keydown', this.onEscClose);
      this.isEventListener = false;

      if (this.props.isOpen && selectId === this.id) {
        window.addEventListener('keydown', this.onEscClose);
        this.isEventListener = true;
      }
    }

    if (!this.props.isOpen) {
      this.beforeOpenOnce = false;
      this.afterOpenOnce = false;
    } else {
      this.doneCloseOnce = false;
    }
  }

  componentWillUnmount() {
    reactModal.removeChild(this.ele);
  }

  onModalSelect(id) {
    if (typeof this.props.onModalSelect === 'function') {
      this.props.onModalSelect(id);
    }
    modalSelect(id);
  }

  onRequestClose() {
    if (typeof this.props.onRequestClose === 'function') this.props.onRequestClose();
  }

  onEscClose(e) {
    if (e.keyCode === 27) {
      this.onRequestClose();
    }
  }

  onEventBeforeOpen(props) {
    if (props.isOpen && !this.beforeOpenOnce && typeof props.beforeOpen === 'function') {
      props.beforeOpen();
      this.beforeOpenOnce = true;
    }
  }

  onEventAfterOpen(props) {
    if (props.isOpen && !this.afterOpenOnce && typeof props.afterOpen === 'function') {
      props.afterOpen();
      this.afterOpenOnce = true;
    }
  }

  onEventDoneClose(props) {
    if (!this.doneCloseOnce && typeof props.doneClose === 'function') {
      props.doneClose();
      this.doneCloseOnce = true;
    }
  }

  render() {
    return ReactDOM.createPortal(
      [
        this.props.isOverlay && this.props.isOpen ?
          <Overlay
            overlayClassName={this.props.overlayClassName}
            overlayStyle={this.props.overlayStyle}
            key="reactModalOverlay"
          /> : null,
        this.props.isOpen ?
          <ModalComponent
            {...this.props}
            id={this.id}
            onModalSelect={this.onModalSelect}
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
