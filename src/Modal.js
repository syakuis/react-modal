import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ModalComponent from '_components/Modal';
import Overlay from '_components/Overlay';

const doc = document;
const body = doc.body;
let reactModal = doc.getElementById('react-modal');
if (!reactModal) {
  reactModal = doc.createElement('div');
  reactModal.setAttribute('id', 'react-modal');

  body.insertBefore(
    reactModal,
    body.hasChildNodes() ? body.childNodes[0] : null);
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
    // selectId = modalData[0];
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
  isOverlay: PropTypes.bool,

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
  isCloseButton: true,
  isOverlay: true,

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

    this.beforeOpen = props.isOpen;
    this.afterOpen = props.isOpen;
    this.doneClose = !props.isOpen;

    this.onModalSelect = this.onModalSelect.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
    // this.isEventListener = false;
    // this.onEscClose = this.onEscClose.bind(this);
  }

  componentWillMount() {
    modalOpenTop(this.props.isOpen, this.id);
    this.onEventBeforeOpen(this.props);
    this.onEventAfterOpen(this.props);
    this.onEventDoneClose(this.props);
  }

  componentDidMount() {
    reactModal.appendChild(this.ele);

    // if (this.props.isOpen && !this.isEventListener) {
    //   window.addEventListener('keydown', this.onEscClose);
    //   this.isEventListener = true;
    // }
  }

  componentWillReceiveProps(newProps) {
    modalOpenTop(newProps.isOpen, this.id);
    zIndexUpdate(newProps.zIndex);
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

    modalCloseTop(this.props.isOpen, this.id);

    // if (!this.props.isOpen && this.isEventListener) {
    //   // console.log('----------------------------------------------------evre', this.id);
    //   window.removeEventListener('keydown', this.onEscClose);
    //   this.isEventListener = false;
    // }
    // if (this.props.isOpen && !this.isEventListener) {
    //   // console.log('----------------------------------------------------ev', this.id);
    //   window.addEventListener('keydown', this.onEscClose);
    //   this.isEventListener = true;
    // }
  }

  componentWillUnmount() {
    // window.removeEventListener('keydown', this.onEscClose);
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

  // onEscClose(e) {
  //   // console.log('good-----------------------------------------------', e, this.id, selectId);
  //   if (e.keyCode === 27 && selectId === this.id) {
  //     this.onRequestClose();
  //     // console.log('----------------------------------------------------');
  //     // console.log('esc', this.props.isOpen, this.id, selectId, modalData);
  //   }
  // }

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
