import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Modal, open, close } from './Modal';

const propTypes = {
  children: PropTypes.node,
  isCancelButton: PropTypes.bool,
  cancel: PropTypes.func,
  apply: PropTypes.func,
  message: PropTypes.string,
};

const defaultProps = {
  children: null,
  isCancelButton: true,
  cancel: null,
  apply: null,
  message: '',
};

class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.id = shortid.generate();

    this.onCancel = this.onCancel.bind(this);
    this.onApply = this.onApply.bind(this);
  }

  onOpen() {
    open(this.id);
  }

  onCancel() {
    if (typeof this.props.cancel === 'function') this.props.cancel(this.id, close);
    close(this.id);
  }

  onApply() {
    if (typeof this.props.apply === 'function') this.props.apply(this.id, close);
    close(this.id);
  }

  render() {
    return (
      <Modal
        id={this.id}
        isCloseButton={false}
      >
        {
          this.props.children ?
            this.props.children :
            <div className="message-body">
              <div className="confirm-message">
                {this.props.message}
              </div>
              <hr />
              <div className="text-right">
                {
                  this.props.isCancelButton ?
                    <button type="button" className="btn btn-danger" onClick={this.onCancel}>
                      <i className="fa fa-ban" aria-hidden="true" /> 취소
                    </button> : null
                }
                <button type="button" className="btn btn-success" onClick={this.onApply}>
                  <i className="fa fa-check" aria-hidden="true" /> 확인
                </button>
              </div>
            </div>
        }
      </Modal>
    );
  }
}

Confirm.propTypes = propTypes;
Confirm.defaultProps = defaultProps;

export default Confirm;

