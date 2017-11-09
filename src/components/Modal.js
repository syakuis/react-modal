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
  zIndex: PropTypes.number,

  isCloseButton: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,

  id: PropTypes.string,
  onModalSelect: PropTypes.func,
};

const defaultProps = {
  className: '',
  style: {},
  width: '50%',
  height: 'auto',
  left: null,
  top: null,
  center: true,
  zIndex: null,

  id: null,
  onModalSelect: null,
};

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onClose() {
    this.props.onRequestClose();
  }

  onSelect() {
    if (typeof this.props.onModalSelect === 'function') {
      this.props.onModalSelect(this.props.id);
    }
  }

  render() {
    let center = this.props.center;
    let style = { ...this.props.style, width: this.props.width, height: this.props.height };

    if (this.props.left !== null || this.props.top !== null) {
      center = false;
      style = { ...style, left: this.props.left, top: this.props.top };
    }

    return (
      <div
        className={`${this.props.className} ${s.container} ${center ? s.center : ''}`}
        style={{ ...style, zIndex: this.props.zIndex }}
        role="button"
        tabIndex={0}
        onClick={this.onSelect}
      >
        {
          this.props.isCloseButton ? <span className={s.close} role="button" tabIndex={0} onClick={this.onClose} /> : null
        }
        {this.props.children}
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
