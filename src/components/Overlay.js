/**
 * Modal Component
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 31.
 */
import React from 'react';
// import PropTypes from 'prop-types';
import s from '_resources/style.module.css';

// const propTypes = {
//   zIndex: PropTypes.number,
// };

// const defaultProps = {
//   zIndex: null,
// };

const Overlay = () => <div className={s.overlay} />;
// const Overlay = props => <div className={s.overlay} style={{ zIndex: props.zIndex }} />;

// Overlay.propTypes = propTypes;
// Overlay.defaultProps = defaultProps;

export default Overlay;
