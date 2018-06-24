import React, {Component} from 'react';
import './Board.css';
import InputCell from './InputCell';
import NoInputCell from './NoInputCell';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'board': '',
      'gameid': ''
    };
  }

  componentDidMount() {
    fetch('https://www.sudokurace.io/game.create')
      .then(resp => resp.json())
      .then(json => json.board.split(''))
      .then(board => this.setState({board}))
      .catch(resp => {
        console.log(`Error getting response from server: ${resp}`);
      });
  }

  static parseBoard(board) {
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
          row.push(<td key={`c${perRow}${perColumn}`} className={`cell c${it}`}>
                   <InputCell value={''} index={`${index}`}/></td>);
        } else {
          row.push(<td key={`c${perRow}${perColumn}`} className={`cell c${it}`}>
                   <NoInputCell value={`${value}`} index={`${index}`}/></td>);
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
    const rows = Board.parseBoard(this.state.board);

    return (
      <div >
        <table className="table-style">
          <tbody className="cell">{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
