/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 22.
 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import shortid from 'shortid';
// import Modal from 'react-modal-syaku';
// import 'react-modal-syaku/dist/react-modal-syaku.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import Modal from '../Modal';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.group = shortid.generate();

    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalOpen2 = this.onModalOpen2.bind(this);
    this.onModalOpen3 = this.onModalOpen3.bind(this);
    this.onModalOpen4 = this.onModalOpen4.bind(this);

    this.onEvent = this.onEvent.bind(this);
    this.onAfterOpen = this.onAfterOpen.bind(this);

    this.state = {
      eventState: '',
      isOpen: false,
      isOpen2: false,
      isOpen3: true,
      isOpen4: true,
    };
  }

  onEvent(type) {
    this.setState({ eventState: type });
  }

  onModalOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onModalOpen2() {
    this.setState({ isOpen2: !this.state.isOpen2 });
  }

  onModalOpen3() {
    this.setState({ isOpen3: !this.state.isOpen3 });
  }

  onModalOpen4() {
    this.setState({ isOpen4: !this.state.isOpen4 });
  }

  onAfterOpen() {
    console.log(this.node);
  }

  render() {
    return (
      <div>
        <h3>
          Modal Trigger Event : {this.state.eventState}
        </h3>
        <button type="button" className="btn btn-default" onClick={this.onModalOpen}>
          모달 열기
        </button>
        <Modal
          style={{ color: '#BE3D3D' }}
          className="good"
          isOpen={this.state.isOpen}
          onRequestClose={this.onModalOpen}
          group={this.group}
          title="Multiple Modal"
          id={shortid.generate()}
          beforeOpen={() => this.onEvent('beforeOpen1')}
          afterOpen={() => this.onEvent('afterOpen1')}
          doneClose={() => this.onEvent('beforeClose1')}
        >
          <button type="button" className="btn btn-default" onClick={this.onModalOpen2}>
            Select modal
          </button>
        </Modal>
        <Modal
          group={this.group}
          isOpen={this.state.isOpen2}
          width="500px"
          height="500px"
          center={false}
          top="20px"
          left="20px"
          beforeOpen={() => console.log(this.node)}
          afterOpen={this.onAfterOpen}
          doneClose={() => this.onEvent('beforeClose1')}
        >
          <div ref={(node) => { this.node = node; }}>
            isOpen2
          </div>
          Click me!!!
          <button type="button" className="btn btn-default" onClick={this.onModalOpen2}>닫기</button>
        </Modal>

        <Modal
          onRequestClose={this.onModalOpen3}
          isOpen={this.state.isOpen3}
          beforeOpen={() => this.onEvent('beforeOpen3')}
          doneClose={() => console.log(this.node3)}
        >
          <div ref={(node) => { this.node3 = node; }}>
          isOpen3
          </div>
          Sub Modal
        </Modal>

        <Modal
          onRequestClose={this.onModalOpen4}
          isOpen={this.state.isOpen4}
          top="20px"
          left="20px"
        >
          Top Modal
        </Modal>
      </div>
    );
  }
}

export default ModalContainer;
