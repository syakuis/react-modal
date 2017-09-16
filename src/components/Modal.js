/**
 * Modal Component
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 31.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import close from '_resources/close.png';

const CloseButton = styled.span`
  position: absolute;
  top: -12.5px;
  right: -12.5px;
  display: block;
  width: 30px;
  height: 30px;
  text-indent: -9999px;
  cursor: pointer;
  background: url(${close}) no-repeat 0 0;
`;

// 모달의 크기를 조절한다.
const Container = styled.div`
  padding: 10px;
  background: #fff;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px;

  -webkit-box-shadow: 0 0 7px #000;
  -moz-box-shadow: 0 0 7px #000;
  -o-box-shadow: 0 0 7px #000;
  -ms-box-shadow: 0 0 7px #000;
  box-shadow: 0 0 7px #000;

  position: fixed;
  ${({ center, left, top }) => (center ? `
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    top: 50%;
  ` : `
    left: ${left};
    top: ${top};
  `)}

  ${({ width, height }) => (`
    width: ${width};
    height: ${height};
  `)}
`;

const propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  center: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  isCloseButton: PropTypes.bool,
  onRequestClose: PropTypes.func,

  onModalUpdate: PropTypes.func.isRequired,
  onModalSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  width: '50%',
  height: 'auto',
  left: '0',
  top: '0',
  center: true,
  isCloseButton: true,
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
    let { center } = this.props;
    center = (this.props.left !== '0' || this.props.top !== '0') ? false : center;
    const Content = (
      <Container
        onClick={this.props.onModalSelect}
        data-modal-content=""
        width={this.props.width}
        height={this.props.height}
        left={this.props.left}
        top={this.props.top}
        center={center}
      >
        {
          this.isCloseButton ? <CloseButton onClick={this.onClose} /> : null
        }
        {this.props.children}
      </Container>
    );

    return (
      <div>
        {
          // draggable 추후 적용
          // this.props.draggable ?
          //   <Draggable>{Content}</Draggable> : Content
          Content
        }
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
