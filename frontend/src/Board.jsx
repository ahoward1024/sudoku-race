import React, {Component} from 'react';
import './Board.css';
import InputCell from './InputCell';
import NoInputCell from './NoInputCell';
import PropTypes from 'prop-types';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'board': '',
      'gameid': 0
    };

    this.updateBoard = this.updateBoard.bind(this);
    this.parseBoard = this.parseBoard.bind(this);
  }

  static async fetchResponseJson(url) {
    let board = '';
    try {
      const response = await fetch(url, {'method': 'PUT'});
      const json = await response.json();
      board = await json.board;
    } catch (error) {
      console.log(`Error ${url}: ${error}`);
    }

    return board;
  }

  componentDidMount() {
    const createBoardUrl = `${this.props.url}/game.create`;

    return Board.fetchResponseJson(createBoardUrl).then(board => {
            if (board !== undefined) {
              this.setState({board});
            }
          });
  }

  updateBoard(board) {
    this.setState({board});
  }

  parseBoard() {
    // First load of the board has no state
    const isOnFirstLoad = this.state.board === '';
    const rows = [];

    let index = 0;
    let it = 1;
    for (let perRow = 0; perRow < 9; perRow += 1) {
      const row = [];
      for (let perColumn = 0; perColumn < 9; perColumn += 1) {
        const value = this.state.board[index];
        if (isOnFirstLoad || value === ' ') {
          // If the space is blank, create an empty InputCell
          row.push(<td
                    key={`c${perRow}${perColumn}`}
                    id={`c${perRow}${perColumn}`}
                    className={`cell c${it}`}>
                    <InputCell
                      key={`I${perRow}${perColumn}`}
                      id={`i${perRow}${perColumn}`}
                      gameid={this.state.gameid}
                      index={index}
                      cellSize={this.props.cellSize}
                      textScale={this.props.textScale}
                      value={''}
                      updateBoard={this.updateBoard}
                      url={this.props.url}
                    />
                    </td>);
        } else {
          row.push(<td
                    key={`c${perRow}${perColumn}`}
                    id={`c${perRow}${perColumn}`}
                    className={`cell c${it}`}>
                    <NoInputCell
                      key={`N${perRow}${perColumn}`}
                      id={`i${perRow}${perColumn}`}
                      cellSize={this.props.cellSize}
                      textScale={this.props.textScale}
                      value={`${value}`}
                      index={`${index}`}
                    />
                    </td>);
        }
        if (it % 3 === 0) {
          it -= 3;
        }
        it += 1;
        index += 1;
      }
      it += 3;
      if (it % 10 === 0) {
        it -= 9;
      }
      rows.push(<tr key={`r${perRow}`}>{row}</tr>);
    }

    return rows;
  }

  render() {
    const rows = this.parseBoard();

    return (
      <div>
        <table className="table-style">
          <tbody className="cell">{rows}</tbody>
        </table>
      </div>
    );
  }
}

Board.propTypes = {
  'cellSize': PropTypes.number,
  'textScale': PropTypes.number,
  'url': PropTypes.string
};

Board.defaultProps = {
  'cellSize': 50,
  'textScale': 0.65
};

export default Board;
