/**
 * Modal Component
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 31.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withModal from './withModal';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  zIndex: PropTypes.number,

  onRequestClose: PropTypes.func.isRequired,
  isCloseButton: PropTypes.bool.isRequired,

  className: PropTypes.string,
  style: PropTypes.shape(),
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.shape(),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  left: PropTypes.number,
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
};

const defaultProps = {
  zIndex: null,

  className: null,
  style: {},
  width: '50%',
  height: null,

  containerClassName: null,
  containerStyle: {},

  left: null,
  top: null,
  right: null,
  bottom: null,
};

const setPosition = (value, position) => {
  if (value === null) return {};
  return { [position]: value };
};

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    let style = { ...props.style, width: props.width, height: props.height };

    const left = setPosition(props.left, 'left');
    style = { ...style, ...left };
    const top = setPosition(props.top, 'top');
    style = { ...style, ...top };
    const right = setPosition(props.right, 'right');
    style = { ...style, ...right };
    const bottom = setPosition(props.bottom, 'bottom');
    style = { ...style, ...bottom };

    if (props.zIndex) {
      style = { ...style, zIndex: props.zIndex };
    }

    this.style = style;
  }

  onClose() {
    this.props.onRequestClose();
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={`modal-wrapper${this.props.className ? ` ${this.props.className}` : ''}`}
        style={this.style}
      >
        <div
          className={`modal-container${this.props.containerClassName ? ` ${this.props.containerClassName}` : ''}`}
          style={this.props.containerStyle ? this.props.containerStyle : {}}
        >
          {
            this.props.isCloseButton ? <span className="modal-close" role="button" tabIndex={0} onClick={this.onClose} /> : null
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default withModal(Modal);
