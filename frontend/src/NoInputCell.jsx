import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NoInputCell extends Component {

  render() {
    return (
      <input
        key={this.props.id}
        id={this.props.id}
        className="cell-input noinput"
        maxLength="1"
        value={this.props.value}
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
