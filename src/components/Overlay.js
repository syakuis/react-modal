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
};

const defaultProps = {
  overlayClassName: undefined,
  overlayStyle: {},
};

const Overlay = (props) => {
  const overlayClassName = props.overlayClassName ? `${s.overlay} ${props.overlayClassName}` : s.overlay;

  return (
    <div style={props.overlayStyle ? props.overlayStyle : {}} className={overlayClassName} />
  );
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
