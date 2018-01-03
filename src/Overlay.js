import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isCenter: PropTypes.bool.isRequired,
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.shape({}),
  zIndex: PropTypes.number,
};

const defaultProps = {
  overlayClassName: undefined,
  overlayStyle: {},
  zIndex: null,
};

const append = (result, object) => (object ? { ...result, ...object } : result);

class Overlay extends React.Component {
  constructor(props) {
    super(props);

    this.className = props.isCenter ?
      `modal-overlay modal-overlay-center modal-overlay-alignCenter ${props.overlayClassName}` :
      `modal-overlay ${props.overlayClassName}`;

    this.style = {};
    this.syle = append(this.style, props.zIndex);
    this.syle = append(this.style, props.overlayStyle);
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={this.className}
        style={this.style}
      >
        {this.props.children}
      </div>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
