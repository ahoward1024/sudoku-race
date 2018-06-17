import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NoInputCell extends Component {
  render() {
    return (
      <input
        className="cell-input noinput"
        maxLength="1"
        value={this.props.value}
        readOnly="true"
      />
    );
  }
}

NoInputCell.propTypes = {'value': PropTypes.string};

export default NoInputCell;
