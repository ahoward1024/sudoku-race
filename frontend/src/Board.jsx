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
      'gameid': ''
    };
  }

  static async fetchResponseJson(url) {
    let board = '';
    try {
      const response = await fetch(url);
      const json = await response.json();
      board = await json.board;
    } catch (error) {
      console.log(`Error ${url}: ${error}`);
    }

    return board;
  }

  componentDidMount() {
    return Board.fetchResponseJson(this.props.url).then(board => {
            if (!(board === undefined)) {
              this.setState({board});
            }
          });
  }

  static parseBoard(board, cellSize, textScale) {
    // First load of the board has no state
    const isOnFirstLoad = board === '';
    const rows = [];

    let index = 0;
    let it = 1;
    for (let perRow = 0; perRow < 9; perRow += 1) {
      const row = [];
      for (let perColumn = 0; perColumn < 9; perColumn += 1) {
        const value = board[index];
        if (isOnFirstLoad || value === ' ') {
          // If the space is blank, create an empty InputCell
          row.push(<td
                     key={`c${perRow}${perColumn}`}
                     id={`c${perRow}${perColumn}`}
                     className={`cell c${it}`}>
                   <InputCell
                     key={`I${perRow}${perColumn}`}
                     id={`i${perRow}${perColumn}`}
                     cellSize={cellSize}
                     textScale={textScale}
                     value={''}
                     index={`${index}`}/>
                   </td>);
        } else {
          row.push(<td
                     key={`c${perRow}${perColumn}`}
                     id={`c${perRow}${perColumn}`}
                     className={`cell c${it}`}>
                   <NoInputCell
                     key={`N${perRow}${perColumn}`}
                     id={`i${perRow}${perColumn}`}
                     cellSize={cellSize}
                     textScale={textScale}
                     value={`${value}`}
                     index={`${index}`}/>
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
    const rows = Board.parseBoard(this.state.board, this.props.cellSize, this.props.textScale);

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
