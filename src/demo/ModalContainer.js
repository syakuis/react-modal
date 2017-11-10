/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 22.
 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';

// import Modal from 'react-modal-syaku';
// import 'react-modal-syaku/dist/react-modal.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import Modal from '../index';
import GroupModal from '../GroupModal';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onOpen = this.onOpen.bind(this);
    this.onEvent = this.onEvent.bind(this);

    this.state = {
      eventState: '',
      isOpen: false,
      isOpenOn: true,
      isOpenOn2: false,
      isOpenOn21: false,
      isOpenOn3: true,
      isOpenOn31: true,
      isOpenGroup: false,
      isOpenGroup2: false,
      isOpenEvent: false,
    };
  }

  onOpen(name) {
    this.setState({ [name]: !this.state[name] });
  }

  onEvent(name, state) {
    console.log(`${name} function event test`);
    if (state) this.setState({ eventState: name });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpenOn3}
          onRequestClose={() => this.onOpen('isOpenOn3')}
        >
          <div>
            Modal isOpenOn3
          </div>
        </Modal>
        <Modal
          isOpen={this.state.isOpenOn2}
          onRequestClose={() => this.onOpen('isOpenOn2')}
        >
          <div>
            Modal Popup
            <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenOn21')}>
              Modal Open 21
            </button>
          </div>
          <Modal
            isOpen={this.state.isOpenOn21}
            onRequestClose={() => this.onOpen('isOpenOn21')}
          >
            <div>
              Modal Popup
            </div>
          </Modal>
        </Modal>
        <Modal
          isOpen={this.state.isOpenOn}
          onRequestClose={() => this.onOpen('isOpenOn')}
        >
          <div>
            Modal Popup
          </div>
        </Modal>
        <h3>Basic Modal</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen')}>
          Modal Open 1
        </button>

        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.onOpen('isOpen')}
        >
          <div>
            Modal
            <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenOn')}>
              Modal Open 2
            </button>
          </div>
        </Modal>

        <hr />
        <h3>Group Modal</h3>

        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenGroup')}>
          Group Modal Open
        </button>
        <GroupModal>
          <Modal
            onRequestClose={() => this.onOpen('isOpenGroup')}
            isOpen={this.state.isOpenGroup}
          >
            Top Modal 5
            <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenGroup2')}>
              모달 열기6
            </button>
          </Modal>

          <Modal
            onRequestClose={() => this.onOpen('isOpenGroup2')}
            isOpen={this.state.isOpenGroup2}
            width="300px"
            height="300px"
            beforeOpen={() => { console.log('beforeOpen render', this.nodeEvent2); this.onEvent('beforeOpen', true); }}
            afterOpen={() => { console.log('afterOpen render', this.nodeEvent2); this.onEvent('afterOpen', true); }}
            doneClose={() => { console.log('doneClose render', this.nodeEvent2); this.onEvent('doneClose', true); }}
          >
            <div ref={(node) => { this.nodeEvent2 = node; }}>
              Group Modal Open {this.state.eventState}
            </div>
          </Modal>
        </GroupModal>

        <hr />
        <h3>Event Modal</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenEvent')}>
          Event Modal Open : {this.state.eventState}
        </button>

        <Modal
          isOpen={this.state.isOpenEvent}
          width="500px"
          height="500px"
          onRequestClose={() => this.onOpen('isOpenEvent')}
          beforeOpen={() => { console.log('beforeOpen render', this.nodeEvent); this.onEvent('beforeOpen', true); }}
          afterOpen={() => { console.log('afterOpen render', this.nodeEvent); this.onEvent('afterOpen', true); }}
          doneClose={() => { console.log('doneClose render', this.nodeEvent); this.onEvent('doneClose', true); }}
        >
          <div ref={(node) => { this.nodeEvent = node; }}>
            Modal Trigger {this.state.eventState}
          </div>
        </Modal>

        <Modal
          isOpen={this.state.isOpenOn31}
          onRequestClose={() => this.onOpen('isOpenOn31')}
        >
          <div>
            Modal isOpenOn31
            <button type="button" className="btn btn-default" onClick={() => { this.onOpen('isOpenOn2'); this.onOpen('isOpenOn21'); }}>
              Modal Open 21
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalContainer;
