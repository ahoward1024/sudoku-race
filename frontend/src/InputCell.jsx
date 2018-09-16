import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InputCell extends Component {
  constructor(props) {
    super(props);
    this.state = {'value': this.props.value};
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sendMoveToServer = this.sendMoveToServer.bind(this);
  }

  async sendMoveToServer(url, value) {
    try {
      const response = await fetch(url, {
        'method': 'POST',
        'header': {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'game_id': this.props.gameid,
          'pos': this.props.index,
          'char': value
        })
      });
      const json = await response.json();
      console.log(`${this.props.index}: ${value} | ${json.status}`);
      if (json.status === 'INCOMPLETE' || json.status === 'COMPLETE') {
        this.props.updateBoard(json.board);
      }
    } catch (error) {
      console.log(`Error ${url}: ${error}`);
    }
  }

  handleKeyPress(event) {
    const inputText = event.target.value;
    if (InputCell.isValidInput(inputText)) {
      this.setState({'value': inputText});
      if (inputText !== '') {
        const sendMoveUrl = `${this.props.url}/game.move`;
        this.sendMoveToServer(sendMoveUrl, inputText);
      }
    }
  }

  static isValidInput(input) {
    const emptyStringPattern = /^$/;
    const validDigitsPattern = /^[1-9]$/;

    return validDigitsPattern.test(input) || emptyStringPattern.test(input);
  }

  render() {
    const style = {
      'fontSize': this.props.cellSize * this.props.textScale,
      'height': this.props.cellSize,
      'width': this.props.cellSize
    };

    return (
      <input
        key={this.props.id}
        id={this.props.id}
        style={style}
        className="cell-input"
        onChange={this.handleKeyPress}
        value={this.state.value}
      />
    );
  }
}

InputCell.propTypes = {
  'cellSize': PropTypes.number.isRequired,
  'gameid': PropTypes.number.isRequired,
  'id': PropTypes.string.isRequired,
  'index': PropTypes.number.isRequired,
  'textScale': PropTypes.number.isRequired,
  'updateBoard': PropTypes.func.isRequired,
  'url': PropTypes.string.isRequired,
  'value': PropTypes.string.isRequired
};

export default InputCell;
