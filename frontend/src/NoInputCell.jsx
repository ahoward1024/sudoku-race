import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NoInputCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'position': this.props.position,
      'size': this.props.size,
      'value': this.props.value
    };
  }

  render() {
    return (
      <input
        className="cell-input noinput"
        maxLength="1"
        value={this.state.value}
        readOnly="true"
      />
    );
  }
}

NoInputCell.propTypes = {
  'position': PropTypes.string,
  'size': PropTypes.string,
  'value': PropTypes.string
};

export default NoInputCell;
