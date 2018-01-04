
import React from 'react';
import Modal from '../Modal';

class Trigger extends React.Component {
  constructor(props) {
    super(props);

    this.onOpen = this.onOpen.bind(this);
    this.beforeOpen = this.beforeOpen.bind(this);
    this.afterOpen = this.afterOpen.bind(this);
    this.doneClose = this.doneClose.bind(this);

    this.state = {
      isOpen: false,
      isOpen2: false,
      beforeModal: 'close',
    };
  }

  onOpen(name) {
    this.setState({ [name]: true });
  }

  onClose(name) {
    this.setState({ [name]: false });
  }

  beforeOpen() {
    this.setState({ beforeModal: 'open' });
  }

  afterOpen() {
    this.afterNode.style.color = 'red';
  }

  doneClose() {
    this.setState({ beforeModal: 'close' });
  }

  render() {
    return (
      <div>
        <div className="alert alert-info" role="alert">
          모달이 열리기 전에 임의의 함수를 실행할 수 있다.
        </div>
        <h3># before</h3>
        <p>beforeModal : {this.state.beforeModal}</p>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen')}>before Open</button>&nbsp;
        <p />
        <pre>
          {`
            beforeOpen() {
              this.setState({ beforeModal: 'good!!!' });
            }

            doneClose() {
              this.setState({ beforeModal: 'close' });
            }

            ... skip ...
            <Modal
              beforeOpen={this.beforeOpen}
              doneClose={this.doneClose}
          `}
        </pre>

        <Modal
          onClose={() => this.onClose('isOpen')}
          isOpen={this.state.isOpen}
          beforeOpen={this.beforeOpen}
          doneClose={this.doneClose}
        >
          before modal 활성화 (beforeModal: {this.state.beforeModal})
        </Modal>

        <h3># afterOpen</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen2')}>after Open</button>&nbsp;
        <p />
        <pre>
          {`
            afterOpen() {
              this.afterNode.style.color = 'red';
            }

            ... skip ...
            <Modal
              afterOpen={this.afterOpen}>
              <p ref={(node) => { this.afterNode = node; }}>after modal 활성화</p>
            </Modal>
          `}
        </pre>

        <Modal
          onClose={() => this.onClose('isOpen2')}
          isOpen={this.state.isOpen2}
          afterOpen={this.afterOpen}
        >
          <p ref={(node) => { this.afterNode = node; }}>after modal 활성화</p>
          <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen22')}>Open 22</button>
          <div>
            <Modal
              onClose={() => this.onClose('isOpen22')}
              isOpen={this.state.isOpen22}
            >
              22
            </Modal>
          </div>
        </Modal>

      </div>
    );
  }
}

export default Trigger;
