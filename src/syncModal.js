import { observable, action, computed } from 'mobx';
import shortid from 'shortid';

const createId = () => shortid.generate();
const syncModal = observable({
  modal: [],
  current: computed(() => {
    const firstIndex = 0;
    if (syncModal.modal.lenght === firstIndex) {
      return null;
    }
    return syncModal.modal[firstIndex];
  }),
  isOpen: id => syncModal.modal.indexOf(id) > -1,
  open: action((id) => {
    const modal = syncModal.modal.slice();
    if (modal.indexOf(id) === -1) {
      modal.unshift(id);
      syncModal.modal.replace(modal);
    }
  }),
  close: action((id) => {
    const modal = syncModal.modal.slice();
    const index = modal.indexOf(id);
    if (index > -1) {
      modal.splice(index, 1);
      syncModal.modal.replace(modal);
    }
  }),
});

export { syncModal, createId };
