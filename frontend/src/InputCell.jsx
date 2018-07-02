import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InputCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': this.props.id,
      'value': this.props.value
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    const inputText = event.target.value;
    if (InputCell.isValidInput(inputText)) {
      this.setState({'value': inputText});
    }
  }

  static isValidInput(input) {
    const emptyStringPattern = /^$/;
    const validDigitsPattern = /^[1-9]$/;

    return validDigitsPattern.test(input) || emptyStringPattern.test(input);
  }

  render() {
    return (
      <input
        key={this.state.id}
        id={this.state.id}
        className="cell-input"
        onChange={this.handleKeyPress}
        value={this.state.value}
      />
    );
  }
}

InputCell.propTypes = {
  'id': PropTypes.string,
  'value': PropTypes.string
};

export default InputCell;
