/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 6.
 */

import GlobalVariable from '_commons/GlobalVariable';
import '_resources/style.css';

class ModalDOM {
  constructor(groupId, id, isOverlay) {
    // max zIndex
    this.zIndex = 3000;
    this.group = groupId;
    this.id = id;

    this.gv = new GlobalVariable('modalDOM', {
      order: [],
      selected: null,
    });
    this.rootNode = document.getElementById(groupId);

    this.overlayNode = null;
    this.modalNode = null;

    if (!this.rootNode) {
      this.gv.setArray('order', groupId);
      this.rootNode = document.createElement('div');
      this.rootNode.setAttribute('id', groupId);
      this.rootNode.setAttribute('data-modal', '');

      if (isOverlay) {
        this.overlayNode = document.createElement('div');
        this.overlayNode.setAttribute('data-modal-overlay', '');
        this.overlayNode.setAttribute('data-modal-index', this.getOrderIndex(groupId));
        this.rootNode.appendChild(this.overlayNode);
      }

      document.body.appendChild(this.rootNode);
    }

    this.createModal(id);
  }

  createModal(id) {
    this.modalNode = document.getElementById(id);
    if (!this.modalNode) {
      this.gv.setArray('order', id);
      this.modalNode = document.createElement('div');
      this.modalNode.setAttribute('id', id);
      this.modalNode.setAttribute('data-modal-container', '');
      this.modalNode.setAttribute('data-modal-index', this.getOrderIndex(id));
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
    const thisNode = document.getElementById(id);
    const rootNode = document.getElementById(group);
    const groupNode = Array.from(rootNode.querySelectorAll('[data-modal-container]'));
    let data = groupNode.sort((a, b) => a.dataset.modalIndex - b.dataset.modalIndex)
      .filter(node => node.id === id);
    const frist = Number(groupNode[0].dataset.modalIndex);
    data = Object.assign([], [thisNode, ...data]);

    data.forEach((node, i) => {
      const ele = document.getElementById(node.id);
      const index = frist + i;
      ele.setAttribute('data-modal-index', frist + index);
      ele.querySelector('[data-modal-content]').style.zIndex = this.zIndex + index;
    });
  }

  update() {
    const modalNodes = this.rootNode.querySelectorAll('[data-modal-content]');

    // overlay 제거
    if (this.overlayNode != null) {
      if (modalNodes.length === 0) {
        this.overlayNode.style.display = 'none';
      } else {
        this.overlayNode.style.display = 'block';
      }
      this.overlayNode.style.zIndex = this.zIndex + this.getOrderIndex(this.group);
    }
    // render 되면서 상실되고 새로만들어진 id 가 생긴다. id가 없는 경우 처리하지 않는 다.
    let modalContentNode = document.getElementById(this.id);

    if (modalContentNode) {
      modalContentNode = modalContentNode.querySelector('[data-modal-content]');
      if (modalContentNode) {
        modalContentNode.style.zIndex = this.zIndex + this.getOrderIndex(this.id);
      }
    }
  }

  destroy() {
    const rootNode = document.getElementById(this.group);
    if (rootNode) {
      document.body.removeChild(rootNode);
    }
    this.gv.reset();
  }

  getOrderIndex(orderId) {
    return this.gv.get('order').findIndex(id => id === orderId);
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

  getSelected() {
    return this.gv.get('selected');
  }
}

export default ModalDOM;
