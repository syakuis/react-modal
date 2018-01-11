/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: https://github.com/syakuis
 * @email: syaku@naver.com
 * @since: 2018. 1. 11.
 */
import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Modal, open, close, createId } from './Modal';

const syncConfirm = observable({
  confirm: [],
  active: action((id, message, apply, cancel, alert = false) => {
    syncConfirm.confirm = [
      ...syncConfirm.confirm, {
        id, message, apply, cancel, alert,
      },
    ];
  }),
});

const onCancel = (id, cancel) => {
  close(id);
  if (typeof cancel === 'function') cancel(id);
};

const onApply = (id, apply) => {
  close(id);
  if (typeof apply === 'function') apply(id);
};

const ConfirmBox = observer(() => (
  syncConfirm.confirm.map(item => (
    <Modal
      id={item.id}
      isCloseButton={false}
    >
      {
        <div className="message-body">
          <div className="confirm-message">
            {item.message}
          </div>
          <hr />
          <div className="text-right">
            {
              !item.alert ?
                <button type="button" className="btn btn-danger" onClick={() => onCancel(item.id, item.cancel)}>
                  <i className="fa fa-ban" aria-hidden="true" /> 취소
                </button> : null
            }
            <span>&nbsp;</span>
            <button type="button" className="btn btn-success" onClick={() => onApply(item.id, item.apply)}>
              <i className="fa fa-check" aria-hidden="true" /> 확인
            </button>
          </div>
        </div>
      }
    </Modal>
  ))
));

const Confirm = (message, apply, cancel) => {
  const id = createId();
  syncConfirm.active(id, message, apply, cancel);
  open(id);
};

export default Confirm;
export { ConfirmBox };

