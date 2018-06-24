import React from 'react';
import PropTypes from 'prop-types';

function NoInputCell(props) {
  return <input
            className="cell-input noinput"
            maxLength="1"
            value={props.value}
            readOnly="true"
            />;
}

NoInputCell.propTypes = {'value': PropTypes.string};

export default NoInputCell;
