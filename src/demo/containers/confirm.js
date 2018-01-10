import React from 'react';
import Confirm from '../Confirm';

class AlertConfirm extends React.Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    this.confirm.onOpen();
  }

  render() {
    return (
      <div>
        <h3># refs 를 이용한 confirm 호출</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onSave('isOpen')}>저장</button>
        <p />
        <pre>
          {`
          ref={(node) => { this.confirm = node; }}
          `}
        </pre>

        <Confirm
          ref={(node) => { this.confirm = node; }}
        />
        <hr />
      </div>
    );
  }
}

export default AlertConfirm;
