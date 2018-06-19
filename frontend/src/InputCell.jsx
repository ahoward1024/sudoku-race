import React, {Component} from 'react';

class InputCell extends Component {
  constructor(props) {
    super(props);
    this.isNumber = this.isNumber.bind(this);
  }

  isNumber(event) {
    this.keycode = event.keyCode;
    if (this.keycode > 31 && (this.keycode < 48 || this.keycode > 57)) {
      event.preventDefault();

      return false;
    }

    return true;
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
