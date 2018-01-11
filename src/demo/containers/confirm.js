import React from 'react';
import Confirm, { ConfirmBox } from '../Confirm';

class ConfirmExample extends React.Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);

    this.state = {
      save: 'no',
    };
  }

  onSave() {
    Confirm(
      '삭제하시겠습니까?',
      () => { console.log('확인'); this.setState({ save: 'ok' }); },
      () => { console.log('취소'); },
    );

    Confirm(
      '삭제하시겠습니까222?',
      () => { console.log('확인22'); },
      () => { console.log('취소22'); },
    );
  }

  render() {
    return (
      <div>
        <h3># refs 를 이용한 confirm 호출</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onSave('isOpen')}>저장</button>
        <p />
        {this.state.save}
        <ConfirmBox />
        <hr />
        <pre>
          {`
          onSave() {
            Confirm(
              '삭제하시겠습니까?',
              () => { console.log('확인'); },
              () => { console.log('취소'); },
            );

            Confirm(
              '삭제하시겠습니까222?',
              () => { console.log('확인22'); },
              () => { console.log('취소22'); },
            );
          }

          <button type="button" className="btn btn-default" onClick={() => this.onSave('isOpen')}>저장</button>

          <ConfirmBox /> // only one
          `}
        </pre>
        <hr />
        <pre>
          {`
          import React from 'react';
          import shortid from 'shortid';
          import { observable, action } from 'mobx';
          import { observer } from 'mobx-react';
          import { Modal, open, close } from './Modal';

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
            const id = shortid.generate();
            syncConfirm.active(id, message, apply, cancel);
            open(id);
          };

          export default Confirm;
          export { ConfirmBox };
          `}
        </pre>
      </div>
    );
  }
}

export default ConfirmExample;
