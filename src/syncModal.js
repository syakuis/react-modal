import { observable, action, computed } from 'mobx';
import shortid from 'shortid';
import { defaultProperties } from './properties';

const createId = () => shortid.generate();
const syncModal = observable({
  modal: [],
  current: computed(() => {
    const firstIndex = 0;
    if (syncModal.modal.length === firstIndex) return null;
    return syncModal.modal[firstIndex];
  }),
  isOpen: id => syncModal.modal.indexOf(id) > -1,
  open: action('react-modal open', (id) => {
    let modal = syncModal.modal.slice();
    if (modal.indexOf(id) === -1) {
      modal.unshift(id);

      if (modal.length > defaultProperties.modalLimit) {
        modal = modal.slice(0, defaultProperties.modalLimit);
      }
      syncModal.modal.replace(modal);
    }
    // console.log('open: ', syncModal.modal.slice());
  }),
  close: action('react-modal close', (id) => {
    const modal = syncModal.modal.slice();
    const index = modal.indexOf(id);
    if (index > -1) {
      modal.splice(index, 1);
      syncModal.modal.replace(modal);
    }
    // console.log('open: ', syncModal.modal.slice());
  }),
});

export { syncModal, createId };
