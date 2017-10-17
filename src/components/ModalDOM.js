/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 6.
 */

import s from '_resources/style.module.css';

class ModalDOM {
  constructor(groupId, id, isOverlay) {
    // max zIndex
    this.zIndex = 3000;
    this.group = groupId;
    this.id = id;

    this.document = document;
    this.body = document.body;

    this.rootNode = this.document.getElementById(groupId);

    this.overlayNode = null;
    this.modalNode = null;

    if (!this.rootNode) {
      this.rootNode = this.document.createElement('div');
      this.rootNode.setAttribute('id', groupId);
      this.rootNode.setAttribute('data-modal', '');

      if (isOverlay) {
        this.overlayNode = this.document.createElement('div');
        this.overlayNode.setAttribute('data-modal-overlay', '');
        this.overlayNode.setAttribute('class', s.overlay);
        this.rootNode.appendChild(this.overlayNode);
      }

      this.body.appendChild(this.rootNode);
    }

    this.createModal(id);
  }

  createModal(id) {
    this.modalNode = this.document.getElementById(id);
    if (!this.modalNode) {
      this.modalNode = this.document.createElement('div');
      this.modalNode.setAttribute('id', id);
      this.modalNode.setAttribute('data-modal-container', '');
      this.rootNode.appendChild(this.modalNode);
    }
  }

  /**
   * 모달을 선택하면 zIndex를 조절하여 맨 앞으로 보이게 해준다.
   * @author Seok Kyun. Choi. 최석균 (Syaku)
   * @param {any} group
   * @param {any} id
   * @memberof ModalDOM
   */
  zIndexUpdate(group, id) {
    const rootNode = this.document.getElementById(group);
    const groupNode = Array.from(rootNode.querySelectorAll('[data-modal-container]'));

    groupNode.forEach((node) => {
      const ele = this.document.getElementById(node.id).querySelector('[data-modal-content]');
      if (ele) {
        const zIndex = node.id === id ? this.zIndex + 1 : this.zIndex;
        ele.style.zIndex = zIndex;
      }
    });
  }

  update() {
    const modalNodes = this.rootNode.querySelectorAll('[data-modal-content]');
    const overlayNode = this.overlayNode === null ? this.rootNode.querySelector('[data-modal-overlay]') : this.overlayNode;

    // overlay 제거
    if (overlayNode != null && overlayNode.style) {
      if (modalNodes.length === 0) {
        overlayNode.style.display = 'none';
      } else {
        overlayNode.style.display = 'block';
      }
      // this.overlayNode.style.zIndex = this.zIndex + this.getOrderIndex(this.group);
      overlayNode.style.zIndex = this.zIndex;
    }
    // render 되면서 상실되고 새로만들어진 id 가 생긴다. id가 없는 경우 처리하지 않는 다.
    let modalContentNode = this.document.getElementById(this.id);

    if (modalContentNode) {
      modalContentNode = modalContentNode.querySelector('[data-modal-content]');
      if (modalContentNode) {
        // modalContentNode.style.zIndex = this.zIndex + this.getOrderIndex(this.id);
        modalContentNode.style.zIndex = this.zIndex;
      }
    }
  }

  destroy() {
    const rootNode = this.document.getElementById(this.group);
    if (rootNode) {
      this.body.removeChild(rootNode);
    }
  }

  getRootNode() {
    return this.rootNode;
  }

  getOverlayNode() {
    return this.overlayNode;
  }

  getModalNode() {
    return this.modalNode;
  }
}

export default ModalDOM;
