import React, {Component} from 'react';
import './Board.css';
import Cell from './Cell';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
'board': '',
'width': 0,
'height': 0
};
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

  render() {
    const rows = [];
    let pos = 0;
    let it = 1;
    for (let i = 0; i < 9; ++i) {
      const row = [];
      for (let j = 0; j < 9; ++j) {
        const val = this.state.board[pos];
        // NOTE/FIXME(alex): Without (val === undefined) React will complain that the CellNoInput
        // is an uncontrolled component that is being switched to a controlled component.
        let read_only = true;
        let cell_value = val;
        if (val === ' ' || val === undefined) {
          read_only = false;
          cell_value = '';
        }
        row.push(<td key={`c${i}${j}`} className={`cell c${it}`}>
                 <Cell value={cell_value} readOnly={read_only}/></td>);

        if (it % 3 === 0) {
          it -= 3;
        }
        ++it;
        ++pos;
      }
      it += 3;
      if (it % 10 === 0) {
        it -= 9;
      }
      rows.push(<tr key={`r${i}`}>{row}</tr>);
    }

    const style = {
      'width': this.props.width,
      'height': this.props.height
    };

return (
      <div >
        <table className="table-style" style={style}>
          <tbody className="cell">{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
