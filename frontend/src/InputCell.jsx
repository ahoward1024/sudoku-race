import React, {Component} from 'react';

class InputCell extends Component {
  static isNumber(event) {
    const keycode = event.keyCode;
    if (keycode > 31 && (keycode < 48 || keycode > 57)) {
      event.preventDefault();
    }
  }

  render() {
    return (
      <input
        className="cell-input"
        maxLength="1"
        onKeyPress={this.isNumber}
      />
    );
  }
}

export default InputCell;
