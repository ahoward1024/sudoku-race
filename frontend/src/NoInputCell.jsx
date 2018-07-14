import React from 'react';
import PropTypes from 'prop-types';

function NoInputCell({cellSize, id, textScale, value}) {

    const style = {
      'fontSize': cellSize * textScale,
      'height': cellSize,
      'width': cellSize
    };

    return (
      <input
        key={id}
        id={id}
        style={style}
        className="cell-input noinput"
        maxLength="1"
        value={value}
        readOnly="true"
      />
    );
}

NoInputCell.propTypes = {
  'id': PropTypes.string,
  'value': PropTypes.string
};

export default NoInputCell;
