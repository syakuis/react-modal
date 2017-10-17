/**
 * Modal Component
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 31.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from '_resources/style.module.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
  width: PropTypes.string,
  height: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  center: PropTypes.bool,
  isOpen: PropTypes.bool,
  isCloseButton: PropTypes.bool,
  onRequestClose: PropTypes.func,

  onModalUpdate: PropTypes.func.isRequired,
  onModalSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  className: '',
  style: undefined,
  width: '50%',
  height: 'auto',
  left: '0',
  top: '0',
  center: true,
  isCloseButton: true,
  isOpen: false,
  onRequestClose: null,
};

class Modal extends Component {
  constructor(props) {
    super(props);

    this.isCloseButton = props.onRequestClose === null ? false : props.isCloseButton;
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.props.onModalUpdate();
  }

  componentDidUpdate() {
    this.props.onModalUpdate(true);
  }

  onClose() {
    this.props.onRequestClose();
  }

  render() {
    if (!this.props.isOpen) return null;
    const center = (this.props.left !== '0' || this.props.top !== '0') ? false : this.props.center;
    let style = { ...this.props.style, width: this.props.width, height: this.props.height };

    if (!center) {
      style = { ...style, left: this.props.left, top: this.props.top };
    }
    return (
      <div
        className={`${this.props.className} ${s.container} ${center ? s.center : ''}`}
        style={{ ...style }}
        role="button"
        tabIndex={0}
        onClick={this.props.onModalSelect}
        data-modal-content=""
      >
        {
          this.isCloseButton ? <span className={s.close} role="button" tabIndex={0} onClick={this.onClose} /> : null
        }
        {this.props.children}
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
