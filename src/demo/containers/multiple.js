
import React from 'react';
import Modal from '../Modal';

class Multiple extends React.Component {
  constructor(props) {
    super(props);

    this.onOpen = this.onOpen.bind(this);

    this.state = {
      isOpen: true,
      isOpen2: true,
      isOpen3: false,
    };
  }

  onOpen(name) {
    this.setState({ [name]: true });
  }

  onClose(name) {
    this.setState({ [name]: false });
  }

  render() {
    return (
      <div>
        <h3># multiple modal</h3>
        <div className="alert alert-info" role="alert">
          여러 모달이 활성화된 순서대로 열고 닫을 수 있다. 모달 source code 순서와 상관없다.

        </div>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen')}>Open #1</button>&nbsp;
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen2')}>Open #2</button>
        <p />
        <pre>
          {`
          <Modal
            onClose={() => this.onClose('isOpen3')}
            isOpen={this.state.isOpen3}
            width="500px"
            height="500px"
            style={{ backgroundColor: 'gray', color: '#fff' }}
            isCenter={false}
          >
            Child 활성화
          </Modal>

          <Modal
            onClose={() => this.onClose('isOpen')}
            isOpen={this.state.isOpen}
          >
            Open #1 활성화
            <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen3')}>
              Child Open
            </button>
          </Modal>

          <Modal
            onClose={() => this.onClose('isOpen2')}
            isOpen={this.state.isOpen2}
            width="300px"
            height="300px"
          >
            Open #2 활성화
          </Modal>
          `}
        </pre>

        <Modal
          onClose={() => this.onClose('isOpen3')}
          isOpen={this.state.isOpen3}
          width="500px"
          height="500px"
          style={{ backgroundColor: 'gray', color: '#fff' }}
          isCenter={false}
        >
          Child 활성화
        </Modal>

        <Modal
          onClose={() => this.onClose('isOpen')}
          isOpen={this.state.isOpen}
        >
          Open #1 활성화
          <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen3')}>
            Child Open
          </button>
        </Modal>

        <Modal
          onClose={() => this.onClose('isOpen2')}
          isOpen={this.state.isOpen2}
          width="300px"
          height="300px"
        >
          Open #2 활성화
        </Modal>
      </div>
    );
  }
}

export default Multiple;
