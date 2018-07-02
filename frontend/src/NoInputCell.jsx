import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NoInputCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': this.props.id,
      'value': this.props.value
    };
  }

  render() {
    return (
      <input
        key={this.state.id}
        id={this.state.id}
        className="cell-input noinput"
        maxLength="1"
        value={this.state.value}
        readOnly="true"
      />
    );
  }
}

NoInputCell.propTypes = {
  'id': PropTypes.string,
  'value': PropTypes.string
};

export default NoInputCell;
