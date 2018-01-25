import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import shortid from 'shortid';
import '_resources/modal.css';
import { syncModal } from './syncModal';
import { defaultPropTypes, getDefaultProps } from './properties';
import { isScrollBarDisable, scrollbarHidden } from './utils';
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

const propTypes = {
  children: defaultPropTypes.children.isRequired,
  id: defaultPropTypes.id,

  isCenter: defaultPropTypes.isCenter,
  left: defaultPropTypes.left,
  top: defaultPropTypes.top,
  right: defaultPropTypes.right,
  bottom: defaultPropTypes.bottom,

  beforeOpen: defaultPropTypes.beforeOpen,
  afterOpen: defaultPropTypes.afterOpen,
  doneClose: defaultPropTypes.doneClose,

  isOpen: defaultPropTypes.isOpen,
  onClose: defaultPropTypes.onClose,

  zIndex: defaultPropTypes.zIndex,

  overlayClassName: defaultPropTypes.overlayClassName,
  overlayStyle: defaultPropTypes.overlayStyle,
  isOverlayClose: defaultPropTypes.isOverlayClose,

  isCloseButton: defaultPropTypes.isCloseButton,
  isEscClose: defaultPropTypes.isEscClose,
};

// 데이터 처리는 will 에서 처리된 데이터를 활용하여 판단하는 건 did 에서 이루어 져야한다.
const withModal = (Component) => {
  const Modal = observer(class Modal extends React.Component {
    static get defaultProps() {
      const defaultProps = getDefaultProps();
      return {
        id: defaultProps.id,
        isCenter: defaultProps.isCenter,
        left: defaultProps.left,
        top: defaultProps.top,
        right: defaultProps.right,
        bottom: defaultProps.bottom,
        beforeOpen: defaultProps.beforeOpen,
        afterOpen: defaultProps.afterOpen,
        doneClose: defaultProps.doneClose,
        isOpen: defaultProps.isOpen,
        onClose: defaultProps.onClose,
        zIndex: defaultProps.zIndex,
        overlayClassName: defaultProps.overlayClassName,
        overlayStyle: defaultProps.overlayStyle,
        isOverlayClose: defaultProps.isOverlayClose,
        isEscClose: defaultProps.isEscClose,
        isCloseButton: defaultProps.isCloseButton,
      };
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
      if (!this.isScrollBarDisable) scrollbarHidden(syncModal);

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

      if (!this.isScrollBarDisable) scrollbarHidden(syncModal);

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
          onRequestClose={this.props.isOverlayClose ? this.onRequestClose : null}
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
