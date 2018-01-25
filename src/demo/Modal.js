/* eslint global-require: "off" */
const ModalFactory = (process.env.SOURCE_TARGET === 'node') ? require('react-modal-syaku') : require('../Modal');

if (process.env.SOURCE_TARGET === 'node') {
  require('react-modal-syaku/dist/react-modal.css');
}

const {
  createId, open, close, setDefaultProps, getDefaultProps,
} = ModalFactory;

const Modal = (process.env.SOURCE_TARGET === 'node') ? ModalFactory.Modal : ModalFactory.default;

setDefaultProps({ height: 300 });

module.exports = {
  Modal,
  createId,
  open,
  close,
  setDefaultProps,
  getDefaultProps,
};
