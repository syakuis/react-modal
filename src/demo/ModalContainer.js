/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 22.
 */
/* eslint global-require: "off" */
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import '_resources/demo.css';

const Modal = (process.env.SOURCE_TARGET === 'node') ? require('react-modal-syaku').default : require('../Modal').default;
const GroupModal = (process.env.SOURCE_TARGET === 'node') ? require('react-modal-syaku').GroupModal : require('../GroupModal').default;

if (process.env.SOURCE_TARGET === 'node') {
  require('react-modal-syaku/dist/react-modal.css');
}

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onOpen = this.onOpen.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.onEvent2 = this.onEvent.bind(this);
    this.onEvent3 = this.onEvent.bind(this);

    this.stateChangeTest = this.stateChangeTest.bind(this);

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
      stateChangeTest: 0,
    };
  }

  onOpen(name) {
    this.setState({ [name]: !this.state[name] });
  }

  onEvent(name, state) {
    if (state) this.setState({ eventState: name });
  }

  onEvent2(name, state) {
    if (state) this.setState({ eventState: name });
  }

  onEvent3(name, state) {
    if (state) this.setState({ eventState: name });
  }

  stateChangeTest() {
    this.setState({ stateChangeTest: this.state.stateChangeTest += 1 });
  }

  render() {
    return (
      <div className="text-center">
        <Modal
          isOpen={this.state.isOpenOn3}
          onRequestClose={() => this.onOpen('isOpenOn3')}
          className="good"
        >
          <div>
            Modal isOpenOn3
          </div>
        </Modal>
        <Modal
          isOpen={this.state.isOpenOn2}
          onRequestClose={() => this.onOpen('isOpenOn2')}
          width="500px"
          height="500px"
          left={10}
          top={10}
        >
          <div>
            Modal isOpenOn2
            <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenOn21')}>
              Modal Open 21
            </button>
          </div>
          <Modal
            isOpen={this.state.isOpenOn21}
            onRequestClose={() => this.onOpen('isOpenOn21')}
          >
            <div>
              Modal isOpenOn21
              <button type="button" className="btn btn-default" onClick={this.stateChangeTest}>
                State Change Test {this.state.stateChangeTest}
              </button>
            </div>
          </Modal>
        </Modal>
        <Modal
          isOpen={this.state.isOpenOn}
          onRequestClose={() => this.onOpen('isOpenOn')}
        >
          <div>
            Modal isOpenOn
          </div>
        </Modal>
        <h3>Basic Modal</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen')}>
          Modal isOpen
        </button>

        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.onOpen('isOpen')}
        >
          <div>
            Modal isOpen
            <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenOn')}>
              Modal isOpenOn
            </button>
          </div>
        </Modal>

        <hr />
        <h3>Group Modal</h3>

        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenGroup')}>
          Group Modal isOpenGroup
        </button>
        <GroupModal>
          <Modal
            onRequestClose={() => this.onOpen('isOpenGroup')}
            isOpen={this.state.isOpenGroup}
          >
            Top Modal isOpenGroup
            <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenGroup2')}>
              모달 열기 isOpenGroup2
            </button>
          </Modal>

          <Modal
            onRequestClose={() => this.onOpen('isOpenGroup2')}
            isOpen={this.state.isOpenGroup2}
            width="300px"
            height="300px"
            beforeOpen={() => { console.log('Group beforeOpen render', this.nodeEvent2); this.onEvent2('Group beforeOpen', true); }}
            afterOpen={() => { console.log('Group afterOpen render', this.nodeEvent2); this.onEvent2('Group afterOpen', true); }}
            doneClose={() => { console.log('Group doneClose render', this.nodeEvent2); this.onEvent2('Group doneClose', true); }}
          >
            <div ref={(node) => { this.nodeEvent2 = node; }}>
              Group Modal isOpenGroup2 {this.state.eventState}
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
          isEscClose={false}
          width="500px"
          height="500px"
          onRequestClose={() => this.onOpen('isOpenEvent')}
          beforeOpen={() => { console.log('beforeOpen render', this.nodeEvent); this.onEvent('beforeOpen', true); }}
          afterOpen={() => { console.log('afterOpen render', this.nodeEvent); this.onEvent('afterOpen', true); }}
          doneClose={() => { console.log('doneClose render', this.nodeEvent); this.onEvent('doneClose', true); }}
          style={{ color: 'red' }}
          overlayStyle={{ background: 'red' }}
        >
          <div ref={(node) => { this.nodeEvent = node; }}>
            Modal isOpenEvent {this.state.eventState}<br />
            esc close off.
          </div>
        </Modal>

        <Modal
          isOpen={this.state.isOpenOn31}
          onRequestClose={() => this.onOpen('isOpenOn31')}
          beforeOpen={() => { console.log('Open beforeOpen render', this.nodeEvent3); this.onEvent3('Open beforeOpen', true); }}
          afterOpen={() => { console.log('Open afterOpen render', this.nodeEvent3); this.onEvent3('Open afterOpen', true); }}
          doneClose={() => { console.log('Open doneClose render', this.nodeEvent3); this.onEvent3('Open doneClose', true); }}
        >
          <div ref={(node) => { this.nodeEvent3 = node; }}>
            Modal isOpenOn31
            <button type="button" className="btn btn-default" onClick={() => { this.onOpen('isOpenOn2'); this.onOpen('isOpenOn21'); }}>
              Modal isOpenOn21
            </button>
          </div>
        </Modal>

        <hr />

        <div className="text-left">
          <pre>
            {`
              <Modal
                isOpen={this.state.isOpenOn3}
                onRequestClose={() => this.onOpen('isOpenOn3')}
                className="good"
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
                  Modal isOpenOn2
                  <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenOn21')}>
                    Modal Open 21
                  </button>
                </div>
                <Modal
                  isOpen={this.state.isOpenOn21}
                  onRequestClose={() => this.onOpen('isOpenOn21')}
                >
                  <div>
                    Modal isOpenOn21
                  </div>
                </Modal>
              </Modal>
              <Modal
                isOpen={this.state.isOpenOn}
                onRequestClose={() => this.onOpen('isOpenOn')}
              >
                <div>
                  Modal isOpenOn
                </div>
              </Modal>
              <h3>Basic Modal</h3>
              <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen')}>
                Modal isOpen
              </button>

              <Modal
                isOpen={this.state.isOpen}
                onRequestClose={() => this.onOpen('isOpen')}
              >
                <div>
                  Modal isOpen
                  <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenOn')}>
                    Modal isOpenOn
                  </button>
                </div>
              </Modal>

              <hr />
              <h3>Group Modal</h3>

              <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenGroup')}>
                Group Modal isOpenGroup
              </button>
              <GroupModal>
                <Modal
                  onRequestClose={() => this.onOpen('isOpenGroup')}
                  isOpen={this.state.isOpenGroup}
                >
                  Top Modal isOpenGroup
                  <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenGroup2')}>
                    모달 열기 isOpenGroup2
                  </button>
                </Modal>

                <Modal
                  onRequestClose={() => this.onOpen('isOpenGroup2')}
                  isOpen={this.state.isOpenGroup2}
                  width="300px"
                  height="300px"
                  beforeOpen={() => { console.log('Group beforeOpen render', this.nodeEvent2); this.onEvent2('Group beforeOpen', true); }}
                  afterOpen={() => { console.log('Group afterOpen render', this.nodeEvent2); this.onEvent2('Group afterOpen', true); }}
                  doneClose={() => { console.log('Group doneClose render', this.nodeEvent2); this.onEvent2('Group doneClose', true); }}
                >
                  <div ref={(node) => { this.nodeEvent2 = node; }}>
                    Group Modal isOpenGroup2 {this.state.eventState}
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
                isEscClose={false}
                width="500px"
                height="500px"
                onRequestClose={() => this.onOpen('isOpenEvent')}
                beforeOpen={() => { console.log('beforeOpen render', this.nodeEvent); this.onEvent('beforeOpen', true); }}
                afterOpen={() => { console.log('afterOpen render', this.nodeEvent); this.onEvent('afterOpen', true); }}
                doneClose={() => { console.log('doneClose render', this.nodeEvent); this.onEvent('doneClose', true); }}
                style={{ color: 'red' }}
                overlayStyle={{ background: 'red' }}
              >
                <div ref={(node) => { this.nodeEvent = node; }}>
                  Modal isOpenEvent {this.state.eventState}<br />
                  esc close off.
                </div>
              </Modal>

              <Modal
                isOpen={this.state.isOpenOn31}
                onRequestClose={() => this.onOpen('isOpenOn31')}
                beforeOpen={() => { console.log('Open beforeOpen render', this.nodeEvent3); this.onEvent3('Open beforeOpen', true); }}
                afterOpen={() => { console.log('Open afterOpen render', this.nodeEvent3); this.onEvent3('Open afterOpen', true); }}
                doneClose={() => { console.log('Open doneClose render', this.nodeEvent3); this.onEvent3('Open doneClose', true); }}
              >
                <div ref={(node) => { this.nodeEvent3 = node; }}>
                  Modal isOpenOn31
                  <button type="button" className="btn btn-default" onClick={() => { this.onOpen('isOpenOn2'); this.onOpen('isOpenOn21'); }}>
                    Modal isOpenOn21
                  </button>
                </div>
              </Modal>
            `}
          </pre>
        </div>
      </div>
    );
  }
}

export default ModalContainer;
