import React, {Component} from 'react';

class InputCell extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (!InputCell.isNumber(this.event.key)) {
      this.event.preventDefault();
    }
  }

  static isNumber(number) {
    const pattern = /^\d+$/;

    return pattern.test(number);
  }

  render() {
    return (
      <input
        className="cell-input"
        maxLength="1"
        onKeyPress={this.handleKeyPress}
      />
    );
  }
}

export default InputCell;
