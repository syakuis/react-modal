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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.number,
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  center: PropTypes.bool,

  isCloseButton: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,

  id: PropTypes.string,
  onModalSelect: PropTypes.func,
};

const defaultProps = {
  className: null,
  style: {},
  width: '50%',
  height: 'auto',
  left: null,
  top: null,
  right: null,
  bottom: null,
  center: true,

  id: null,
  onModalSelect: null,
};

const setPosition = (value, position) => {
  if (value === null) return {};
  return { [position]: value };
};

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.onRequestClose();
  }

  render() {
    let isCenter = this.props.center;
    let style = { ...this.props.style, width: this.props.width, height: this.props.height };

    const left = setPosition(this.props.left, 'left');
    style = { ...style, ...left };
    const top = setPosition(this.props.top, 'top');
    style = { ...style, ...top };
    const right = setPosition(this.props.right, 'right');
    style = { ...style, ...right };
    const bottom = setPosition(this.props.bottom, 'bottom');
    style = { ...style, ...bottom };

    if (this.props.left !== null || this.props.top !== null
      || this.props.right !== null || this.props.bottom !== null) {
      isCenter = false;
    }

    return (
      <div
        className={`${s.container} ${isCenter ? `${s.center} ` : ''}${this.props.className ? `${this.props.className}` : ''}`}
        style={style}
        role="button"
        id={this.props.id}
        tabIndex={0}
        onClick={e => this.props.onModalSelect(e, this.props.id)}
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
