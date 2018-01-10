import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import shortid from 'shortid';
import '_resources/modal.css';
import { syncModal } from './syncModal';

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

const getBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  const result = {
    text: null,
    firefox: false,
    msie: false,
    edge: false,
    chrome: false,
    safari: false,
  };

  if (userAgent.indexOf('firefox') > -1) {
    result.firefox = true;
    result.text = 'firefox';
  } else if (userAgent.indexOf('msie') > -1) {
    result.msie = true;
    result.text = 'msie';
  } else if (userAgent.indexOf('ie') > -1) {
    result.msie = true;
    result.text = 'msie';
  } else if (userAgent.indexOf('edge') > -1) {
    result.edge = true;
    result.text = 'edge';
  } else if (userAgent.indexOf('trident') > -1) {
    result.msie = true;
    result.text = 'msie';
  } else if (userAgent.indexOf('chrome') > -1) {
    result.chrome = true;
    result.text = 'chrome';
  } else if (userAgent.indexOf('safari') > -1) {
    result.safari = true;
    result.text = 'safari';
  }
  return result;
};

const thisBrowser = getBrowser();

// 스크롤바 활성화 여부 판단
const isScrollBarDisable = () => doc.body.clientHeight < window.innerHeight;

// 윈도우 스크롤바의 넓이를 계산한다. 크로스 브라우저를 지원한다.
const getScrollBarWidth = () => {
  const inner = doc.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '100%';

  const outer = doc.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.height = '100px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);

  docBody.appendChild(outer);

  const w1 = inner.offsetWidth;
  const h1 = inner.offsetHeight;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;
  let h2 = inner.offsetHeight;
  if (w1 === w2 && outer.clientWidth) {
    w2 = outer.clientWidth;
  }
  if (h1 === h2 && outer.clientHeight) {
    h2 = outer.clientHeight;
  }

  docBody.removeChild(outer);

  // return [(w1 - w2), (h1 - h2)];
  return w1 - w2;

  // const scrollDiv = doc.createElement('div');
  // scrollDiv.style.visibility = 'hidden';
  // scrollDiv.style.width = '100px';
  // scrollDiv.style.msOverflowStyle = 'scrollbar';
  // doc.body.appendChild(scrollDiv);

  // const widthNoScroll = scrollDiv.offsetWidth;
  // scrollDiv.style.overflow = 'scroll';

  // const scrollDivInner = doc.createElement('div');
  // scrollDivInner.style.width = '100%';
  // scrollDiv.appendChild(scrollDivInner);

  // const widthWithScroll = scrollDivInner.offsetWidth;

  // scrollDiv.parentNode.removeChild(scrollDiv);

  // return widthNoScroll - widthWithScroll;
};

const scrollbarWidth = getScrollBarWidth();

const scrollbarHidden = () => {
  const { body } = doc;

  if (syncModal.modal.length > 0) {
    body.style.overflow = 'hidden';
    if (!thisBrowser.msie) body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    body.style.overflow = '';
    if (!thisBrowser.msie) body.style.paddingRight = '';
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
  onClose: PropTypes.func,

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
  onClose: null,

  zIndex: 3000,

  overlayClassName: null,
  overlayStyle: null,

  isEscClose: true,
  isCloseButton: true,

};

// 데이터 처리는 will 에서 처리된 데이터를 활용하여 판단하는 건 did 에서 이루어 져야한다.
const withModal = (Component) => {
  const Modal = observer(class Modal extends React.Component {
    static get defaultProps() {
      return defaultProps;
    }

    static get propTypes() {
      return propTypes;
    }

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

      this.onOpen = this.onOpen.bind(this);
      this.onRequestClose = this.onRequestClose.bind(this);
      this.onEscClose = this.onEscClose.bind(this);
      this.onResizeEventListener = this.onResizeEventListener.bind(this);

      this.isOpen = syncModal.isOpen(this.id);
    }

    componentWillMount() {
      if (this.props.isOpen) {
        this.onOpen();
        this.isOpen = syncModal.isOpen(this.id);
      }
      this.onEventBeforeOpen();
    }

    componentDidMount() {
      if (this.isOpen) reactModal.appendChild(this.ele);

      this.onEventAfterOpen();

      this.isScrollBarDisable = isScrollBarDisable();
      if (!this.isScrollBarDisable) scrollbarHidden();

      if (this.props.isEscClose &&
          this.isOpen && !this.isKeydownEventListener && syncModal.current === this.id) {
        window.addEventListener('keydown', this.onEscClose);
        this.isKeydownEventListener = true;
      }

      if (!this.isResizeEventListener && syncModal.current === this.id) {
        this.onResizeEventListener();
        window.addEventListener('resize', this.onResizeEventListener);
        this.isResizeEventListener = true;
      }
    }

    componentWillUpdate() {
      this.isOpen = syncModal.isOpen(this.id);

      this.onEventBeforeOpen();
      if (!this.isOpen) this.onEventDoneClose();
    }

    componentDidUpdate() {
      const ele = doc.getElementById(this.id);
      if (ele && !this.isOpen) reactModal.removeChild(this.ele);
      if (!ele && this.isOpen) reactModal.appendChild(this.ele);

      this.onEventAfterOpen();

      if (this.props.isEscClose) {
        window.removeEventListener('keydown', this.onEscClose);
        this.isKeydownEventListener = false;

        if (this.isOpen && syncModal.current === this.id) {
          window.addEventListener('keydown', this.onEscClose);
          this.isKeydownEventListener = true;
        }
      }

      this.onResizeEventListener();
      window.removeEventListener('resize', this.onResizeEventListener);
      this.isResizeEventListener = false;

      if (syncModal.current === this.id) {
        window.addEventListener('resize', this.onResizeEventListener);
        this.isResizeEventListener = true;
      }

      if (!this.isScrollBarDisable) scrollbarHidden();

      if (!this.isOpen) {
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
      if (typeof this.props.onClose === 'function') {
        this.props.onClose(this.id);
      } else {
        syncModal.close(this.id);
      }
      this.isOpen = false;
    }

    onEscClose(e) {
      if (e.keyCode === 27) {
        this.onRequestClose();
      }
    }

    onEventBeforeOpen() {
      if (this.isOpen && !this.beforeOpenOnce && typeof this.props.beforeOpen === 'function') {
        this.props.beforeOpen();
        this.beforeOpenOnce = true;
      }
    }

    onEventAfterOpen() {
      if (this.isOpen && !this.afterOpenOnce && typeof this.props.afterOpen === 'function') {
        this.props.afterOpen();
        this.afterOpenOnce = true;
      }
    }

    onEventDoneClose() {
      if (!this.doneCloseOnce && typeof this.props.doneClose === 'function') {
        this.props.doneClose();
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

    onOpen() {
      syncModal.open(this.id);
    }

    render() {
      if (!syncModal.isOpen(this.id)) return null;
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
  });

  return Modal;
};

export default withModal;
