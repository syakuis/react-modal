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

// 스크롤바 활성화 여부 판단
const isScrollBarDisable = () => document.body.clientHeight < window.innerHeight;

// 윈도우 스크롤바의 넓이를 계산한다. 크로스 브라우저를 지원한다.
const getScrollBarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.visibility = 'hidden';
  scrollDiv.style.width = '100px';
  scrollDiv.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(scrollDiv);

  const widthNoScroll = scrollDiv.offsetWidth;
  scrollDiv.style.overflow = 'scroll';

  const scrollDivInner = document.createElement('div');
  scrollDivInner.style.width = '100%';
  scrollDiv.appendChild(scrollDivInner);

  const widthWithScroll = scrollDivInner.offsetWidth;

  scrollDiv.parentNode.removeChild(scrollDiv);

  return widthNoScroll - widthWithScroll;
};

const doc = document;
const docBody = doc.body;

const scrollbarWidth = getScrollBarWidth();
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

const scrollbarHidden = () => {
  const { body } = document;

  if (modalData.length > 0) {
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    body.style.overflow = null;
    body.style.paddingRight = null;
  }
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
  isScrollbar: PropTypes.bool,
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
  isScrollbar: false,
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
    this.ele.style.display = 'none';
    this.ele.style.width = '100%';
    this.ele.style.height = '100%';

    this.beforeOpenOnce = false;
    this.afterOpenOnce = false;
    this.doneCloseOnce = false;

    this.onModalSelect = this.onModalSelect.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.isKeydownEventListener = false;
    this.isResizeEventListener = false;
    this.onEscClose = this.onEscClose.bind(this);

    this.onScrollbar = this.onScrollbar.bind(this);
  }

  componentWillMount() {
    modalOpenTop(this.props.isOpen, this.id);
    this.onOpen(this.props.isOpen);
    this.onEventBeforeOpen(this.props);
  }

  componentDidMount() {
    reactModal.appendChild(this.ele);
    this.onEventAfterOpen(this.props);

    this.isScrollBarDisable = isScrollBarDisable();
    if (!this.isScrollBarDisable) scrollbarHidden();
    if (this.props.isEscClose &&
        this.props.isOpen && !this.isKeydownEventListener && modalData[0] === this.id) {
      window.addEventListener('keydown', this.onEscClose);
      this.isKeydownEventListener = true;
    }

    if (this.props.isScrollbar &&
        this.props.isOpen && !this.isResizeEventListener && modalData[0] === this.id) {
      this.onScrollbar();
      window.addEventListener('resize', this.onScrollbar);
      this.isResizeEventListener = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    modalOpenTop(nextProps.isOpen, this.id);
    this.onOpen(nextProps.isOpen);
    this.onEventBeforeOpen(nextProps);
    if (this.props.isOpen && !nextProps.isOpen) this.onEventDoneClose(nextProps);
  }

  componentWillUpdate(nextProps) {
    modalCloseTop(nextProps.isOpen, this.id);
    this.onOpen(nextProps.isOpen);
  }

  componentDidUpdate() {
    this.onEventAfterOpen(this.props);

    if (this.props.isEscClose) {
      window.removeEventListener('keydown', this.onEscClose);
      this.isKeydownEventListener = false;

      if (this.props.isOpen && selectId === this.id) {
        window.addEventListener('keydown', this.onEscClose);
        this.isKeydownEventListener = true;
      }
    }

    if (this.props.isScrollbar) {
      this.onScrollbar();
      window.removeEventListener('resize', this.onScrollbar);
      this.isResizeEventListener = false;

      if (this.props.isOpen && selectId === this.id) {
        window.addEventListener('resize', this.onScrollbar);
        this.isResizeEventListener = true;
      }
    }

    if (!this.props.isOpen) {
      this.beforeOpenOnce = false;
      this.afterOpenOnce = false;
    } else {
      this.doneCloseOnce = false;
    }

    if (selectId === this.id) {
      const zIndexNew = this.props.zIndex === null ? 1 : this.props.zIndex + 1;
      this.ele.style.zIndex = zIndexNew;
    } else {
      this.ele.style.zIndex = this.props.zIndex;
    }

    if (!this.isScrollBarDisable) scrollbarHidden();
  }

  componentWillUnmount() {
    reactModal.removeChild(this.ele);
    if (this.props.isEscClose) window.removeEventListener('keydown', this.onEscClose);
    if (this.props.isScrollbar) window.removeEventListener('resize', this.onScrollbar);
  }

  // 모달의 높이를 계산하여 창보다 클 경우 스크롤바를 활성화 한다.
  onScrollbar() {
    const ele = document.getElementById(this.id);
    if (!ele || this.isScrollBarDisable) return;
    const windowHeight = window.innerHeight;
    if (windowHeight < ele.offsetHeight) {
      this.ele.style.position = 'fixed';
      this.ele.style.overflowY = 'auto';
      ele.style.position = 'absolute';
      ele.style.transform = 'translateX(-50%)';
      ele.style.top = '0';
    } else {
      this.ele.style.position = 'absolute';
      this.ele.style.overflowY = null;
      ele.style.position = 'fixed';
      ele.style.transform = 'translateX(-50%) translateY(-50%)';
      ele.style.top = '50%';
    }
  }

  onOpen(isOpen) {
    this.ele.style.display = isOpen ? '' : 'none';
  }

  onModalSelect(e, id) {
    e.stopPropagation();
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
