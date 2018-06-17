import React, {Component} from 'react';
import './Board.css';
import InputCell from './InputCell';
import NoInputCell from './NoInputCell';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {'board': ''};
    this.getCellValues = this.getCellValues.bind(this);
  }

  componentDidMount() {
    fetch('http://backend.sudokurace.io/game.create')
      .then(resp => resp.json())
      .then(json => json.board.split(''))
      .then(board => this.setState({board}))
      .catch(resp => {
        console.log(`Error getting response from server: ${resp}`);
      });
  }

  getCellValues() {
    const rows = [];
    let it = 1,
        pos = 0;
    for (let perRow = 0; perRow < 9; perRow += 1) {
      const row = [];
      for (let perColumn = 0; perColumn < 9; perColumn += 1) {
        const val = this.state.board[pos];
        // NOTE/FIXME(alex): Without (val === undefined) React will complain that the CellNoInput
        // is an uncontrolled component that is being switched to a controlled component.
        if (val === ' ' || val === undefined) {
          row.push(<td key={`c${perRow}${perColumn}`} className={`cell c${it}`}>
                   <InputCell/></td>);
        } else {
          row.push(<td key={`c${perRow}${perColumn}`} className={`cell c${it}`}>
                   <NoInputCell value={val}/></td>);
        }
        if (it % 3 === 0) {
          it -= 3;
        }
        it += 1;
        pos += 1;
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
    const rows = this.getCellValues();

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
