import React, {Component} from 'react';

class InputCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'position': this.props.position,
      'size': this.props.size,
      'value': this.props.value
    };
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

InputCell.propTypes = {
  'position': PropTypes.position,
  'size': PropTypes.string,
  'value': PropTypes.string
};

export default InputCell;
