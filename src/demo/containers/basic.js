import React from 'react';
import Modal from '../Modal';

class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.onOpen = this.onOpen.bind(this);

    this.state = {
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
        <h3># basic</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen')}>Open</button>
        <p />
        <pre>
          {`
          isOpen={this.state.isOpen}
          onClose={() => this.onClose('isOpen')}
          `}
        </pre>

        <Modal
          isOpen={this.state.isOpen}
          onClose={() => this.onClose('isOpen')}
        >
          <div>
            esc 키로 닫을 수 있다.
          </div>
        </Modal>
        <hr />
        <h3># inside scrollbar : modal container scrollbar</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenScrollbar')}>Open</button>
        <p />
        <pre>
          {`
            width={500}
            height={500}
            containerStyle={{
              overflowY: 'auto',
              padding: '10px 0px 10px 10px',
            }}
          `}
        </pre>

        <Modal
          isOpen={this.state.isOpenScrollbar}
          onClose={() => this.onClose('isOpenScrollbar')}
          width={500}
          height={500}
          containerStyle={{
            overflowY: 'auto',
            padding: '10px 0px 10px 10px',
          }}
        >
          <div style={{ height: 1200 }}>
            esc 키로 닫을 수 있다.
          </div>
        </Modal>
        <hr />
        <h3># button close, esc disable</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpenButtonClose')}>Open</button>
        <p />
        <pre>
          {`
          isOpen={this.state.isOpenButtonClose}
          onClose={() => this.onClose('isOpenButtonClose')}
          isEscClose={false}
          isCloseButton={false}
          `}
        </pre>

        <Modal
          isOpen={this.state.isOpenButtonClose}
          onClose={() => this.onClose('isOpenButtonClose')}
          isEscClose={false}
          isCloseButton={false}
        >
          <div>
            esc 키로 닫을 수 없다.
            <button type="button" className="btn btn-danger" onClick={() => this.onClose('isOpenButtonClose')}>Close</button>
          </div>
        </Modal>
        <hr />
        <h3># style modify</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen2')}>Open</button>
        <p />
        <pre>
          {`
          isOpen={this.state.isOpen2}
          onClose={() => this.onClose('isOpen2')}
          className="fontSize-20"
          style={{ color: '#fff', background: 'gray' }}
          width={500}
          height={500}
          `}
        </pre>

        <Modal
          isOpen={this.state.isOpen2}
          onClose={() => this.onClose('isOpen2')}
          className="fontSize-20"
          style={{ color: '#fff', background: 'gray' }}
          width={500}
          height={500}
        >
          <div>
            모달의 크기 그리고 `css class, style` 를 변경하였다.<br />
            esc 키로 닫을 수 있다.
          </div>
        </Modal>
        <hr />
        <h3># no center</h3>
        <button type="button" className="btn btn-default" onClick={() => this.onOpen('isOpen3')}>Open</button>
        <p />
        <pre>
          {`
          isOpen={this.state.isOpen3}
          onClose={() => this.onClose('isOpen3')}
          isCenter={false}
          style={{ margin: 10 }}
          `}
        </pre>

        <Modal
          isOpen={this.state.isOpen3}
          onClose={() => this.onClose('isOpen3')}
          isCenter={false}
          height={500}
          style={{ margin: 10 }}
        >
          <div>
            기본적으로 `margin: 0` 이다. 원한다면 직접 `style` 에 `margin` 설정해야 한다.<br />
            esc 키로 닫을 수 있다.
          </div>
        </Modal>
        <hr />
      </div>
    );
  }
}

export default Basic;
