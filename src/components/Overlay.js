/**
 * Modal Component
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 31.
 */
import React from 'react';
import PropTypes from 'prop-types';
import s from '_resources/style.module.css';

const propTypes = {
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.shape({}),
  zIndex: PropTypes.number,
};

const defaultProps = {
  overlayClassName: undefined,
  overlayStyle: {},
  zIndex: null,
};

const Overlay = (props) => {
  const overlayClassName = props.overlayClassName ? `${s.overlay} ${props.overlayClassName}` : s.overlay;
  const zIndex = props.zIndex ? { zIndex: props.zIndex } : {};

  return (
    <div
      className={overlayClassName}
      style={props.overlayStyle ? { ...props.overlayStyle, ...zIndex } : { ...zIndex }}
    />
  );
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
