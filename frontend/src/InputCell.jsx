import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InputCell extends Component {
  constructor(props) {
    super(props);
    this.state = {'value': this.props.value};
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    console.log(event.target.value);
    const inputText = event.target.value;
    if (InputCell.isValidInput(inputText)) {
      this.setState({'value': inputText});
    }
  }

  static isValidInput(input) {
    const emptyStringPattern = /^$/,
          validDigitsPattern = /^[1-9]$/;

    return validDigitsPattern.test(input) || emptyStringPattern.test(input);
  }

  render() {
    return (
      <input
        className="cell-input"
        onChange={this.handleKeyPress}
        value={this.state.value}
      />
    );
  }
}

InputCell.propTypes = {'value': PropTypes.string};

export default InputCell;
