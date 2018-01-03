import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import '_resources/modal.css';

import Overlay from './Overlay';

const doc = document;
const docBody = doc.body;

let reactModal = doc.getElementById('react-modal');

if (!reactModal) {
  reactModal = doc.createElement('div');
  reactModal.setAttribute('id', 'react-modal');

  // docBody.insertBefore(
  //   reactModal,
  //   docBody.hasChildNodes() ? docBody.childNodes[0] : null,
  // );

  docBody.appendChild(reactModal);
}

let currentModal = null;
const modalPark = [];

const setCurrentModal = () => {
  const firstIndex = 0;
  if (modalPark.lenght === firstIndex) {
    currentModal = null;
  } else {
    currentModal = modalPark[firstIndex];
  }
};

const modalOpen = (isOpen, id) => {
  if (!isOpen) return;
  if (modalPark.indexOf(id) === -1) {
    modalPark.unshift(id);
  }

  setCurrentModal();
};

const modalClose = (isOpen, id) => {
  if (isOpen) return;
  const index = modalPark.indexOf(id);
  if (index > -1) {
    modalPark.splice(index, 1);
  }

  setCurrentModal();
};

// 스크롤바 활성화 여부 판단
const isScrollBarDisable = () => doc.body.clientHeight < window.innerHeight;

// 윈도우 스크롤바의 넓이를 계산한다. 크로스 브라우저를 지원한다.
const getScrollBarWidth = () => {
  const scrollDiv = doc.createElement('div');
  scrollDiv.style.visibility = 'hidden';
  scrollDiv.style.width = '100px';
  scrollDiv.style.msOverflowStyle = 'scrollbar';
  doc.body.appendChild(scrollDiv);

  const widthNoScroll = scrollDiv.offsetWidth;
  scrollDiv.style.overflow = 'scroll';

  const scrollDivInner = doc.createElement('div');
  scrollDivInner.style.width = '100%';
  scrollDiv.appendChild(scrollDivInner);

  const widthWithScroll = scrollDivInner.offsetWidth;

  scrollDiv.parentNode.removeChild(scrollDiv);

  return widthNoScroll - widthWithScroll;
};

const scrollbarWidth = getScrollBarWidth();

const scrollbarHidden = () => {
  const { body } = doc;

  if (modalPark.length > 0) {
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

  isCenter: PropTypes.bool,
  left: PropTypes.number,
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,

  beforeOpen: PropTypes.func,
  afterOpen: PropTypes.func,
  doneClose: PropTypes.func,

  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,

  zIndex: PropTypes.number,

  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.shape({}),

  isCloseButton: PropTypes.bool,
  isEscClose: PropTypes.bool,
};

const defaultProps = {
  id: null,

  isCenter: true,
  left: null,
  top: null,
  right: null,
  bottom: null,

  beforeOpen: null,
  afterOpen: null,
  doneClose: null,

  isOpen: false,

  zIndex: 3000,

  overlayClassName: null,
  overlayStyle: null,

  isEscClose: true,
  isCloseButton: true,

};

// 데이터 처리는 will 에서 처리된 데이터를 활용하여 판단하는 건 did 에서 이루어 져야한다.
const withModal = (Component) => {
  class Modal extends React.Component {
    constructor(props) {
      super(props);

      this.id = props.id || shortid.generate();

      this.ele = doc.createElement('div');
      this.ele.setAttribute('id', this.id);

      this.modalId = `${this.id}_modal`;
      this.overlayId = `${this.id}_overlay`;

      this.isCenter = props.isCenter;
      if (props.left !== null || props.top !== null
        || props.right !== null || props.bottom !== null) {
        this.isCenter = false;
      }

      this.beforeOpenOnce = false;
      this.afterOpenOnce = false;
      this.doneCloseOnce = false;

      this.isKeydownEventListener = false;
      this.isResizeEventListener = false;

      this.onRequestClose = this.onRequestClose.bind(this);
      this.onEscClose = this.onEscClose.bind(this);
      this.onResizeEventListener = this.onResizeEventListener.bind(this);

      this.state = {
        isOpen: props.isOpen,
      };
    }

    componentWillMount() {
      modalOpen(this.props.isOpen, this.id);
      modalClose(this.props.isOpen, this.id);

      this.onEventBeforeOpen(this.props);
    }

    componentDidMount() {
      if (this.state.isOpen) reactModal.appendChild(this.ele);

      this.onEventAfterOpen(this.props);

      this.isScrollBarDisable = isScrollBarDisable();
      if (!this.isScrollBarDisable) scrollbarHidden();

      if (this.props.isEscClose &&
          this.props.isOpen && !this.isKeydownEventListener && currentModal === this.id) {
        window.addEventListener('keydown', this.onEscClose);
        this.isKeydownEventListener = true;
      }

      if (!this.isResizeEventListener && currentModal === this.id) {
        this.onResizeEventListener();
        window.addEventListener('resize', this.onResizeEventListener);
        this.isResizeEventListener = true;
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ isOpen: nextProps.isOpen });

      this.onEventBeforeOpen(nextProps);
      if (this.props.isOpen && !nextProps.isOpen) this.onEventDoneClose(nextProps);
    }

    // shouldComponentUpdate() {
    //   console.log('------> shouldComponentUpdate', this.id);
    //   // this.current = nextProps.isOpen && !this.props.isOpen;
    //   return true;
    // }

    componentWillUpdate(nextProps) {
      modalOpen(nextProps.isOpen, this.id);
      modalClose(nextProps.isOpen, this.id);
    }

    componentDidUpdate() {
      const ele = doc.getElementById(this.id);
      if (ele && !this.state.isOpen) reactModal.removeChild(this.ele);
      if (!ele && this.state.isOpen) reactModal.appendChild(this.ele);

      this.onEventAfterOpen(this.props);

      if (this.props.isEscClose) {
        window.removeEventListener('keydown', this.onEscClose);
        this.isKeydownEventListener = false;

        if (this.props.isOpen && currentModal === this.id) {
          window.addEventListener('keydown', this.onEscClose);
          this.isKeydownEventListener = true;
        }
      }

      this.onResizeEventListener();
      window.removeEventListener('resize', this.onResizeEventListener);
      this.isResizeEventListener = false;

      if (currentModal === this.id) {
        window.addEventListener('resize', this.onResizeEventListener);
        this.isResizeEventListener = true;
      }

      if (!this.isScrollBarDisable) scrollbarHidden();

      if (!this.props.isOpen) {
        this.beforeOpenOnce = false;
        this.afterOpenOnce = false;
      } else {
        this.doneCloseOnce = false;
      }
    }

    componentWillUnmount() {
      if (this.props.isEscClose) window.removeEventListener('keydown', this.onEscClose);
      window.removeEventListener('resize', this.onResizeEventListener);
      const ele = doc.getElementById(this.id);
      if (ele) reactModal.removeChild(this.ele);
    }

    onRequestClose() {
      this.props.onClose();
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

    onResizeEventListener() {
      // resize 이벤트를 통해 모달의 세로 정렬을 조작한다.
      // 모달 높이가 브라우저보다 클 경우 중앙 정렬을 하지 않는 다.
      if (!this.isCenter) return;
      const modal = doc.getElementById(this.modalId);
      const overlay = doc.getElementById(this.overlayId);
      if (modal) {
        const windowHeight = window.innerHeight;
        if (windowHeight < modal.offsetHeight) {
          overlay.classList.remove('modal-overlay-alignCenter');
        } else {
          overlay.classList.add('modal-overlay-alignCenter');
        }
      }
    }

    render() {
      if (!this.state.isOpen) return null;
      const {
        isCenter, overlayClassName, overlayStyle, ...props
      } = this.props;
      return ReactDOM.createPortal(
        <Overlay
          id={this.overlayId}
          zIndex={this.props.zIndex}
          isCenter={this.isCenter}
          overlayClassName={overlayClassName}
          overlayStyle={overlayStyle}
        >
          <Component
            {...props}
            id={this.modalId}
            onRequestClose={this.onRequestClose}
          />
        </Overlay>,
        this.ele,
      );
    }
  }

  Modal.propTypes = propTypes;
  Modal.defaultProps = defaultProps;

  return Modal;
};

export default withModal;
