/* eslint global-require: "off" */
const Modal = (process.env.SOURCE_TARGET === 'node') ? require('react-modal-syaku') : require('../Modal').default;

if (process.env.SOURCE_TARGET === 'node') {
  require('react-modal-syaku/dist/react-modal.css');
}

export default Modal;
