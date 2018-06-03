import React, { Component } from 'react';
import './Board.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {gameboard: [8,6,0,0,2,0,0,0,0,0,0,0,7,0,0,0,5,9,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,8,0,0,0,4,0,0,0,0,0,0,0,0,0,5,3,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,6,0,0,0,0,7,5,0,9,0,0,0]};
  }

  render() {
    var rows = [];
    var pos = 0;
    var it = 1;
    for(var i = 0; i < 9; ++i) {
      var row = [];
      for(var j = 0; j < 9; ++j) {
        var val = this.state.gameboard[pos];
        if(val === 0) {
          row.push(<td key={"c"+i+j} className={"cell c"+it}><CellInput/></td>);
        }
        else {
          row.push(<td key={"c"+i+j} className={"cell c"+it}><CellNoInput value={val}/></td>)
        }
        if(it % 3 === 0) {
          it -= 3;
        }
        ++it
        ++pos;
      }
      it += 3;
      if(it % 10 === 0) {
        it -= 9;
      }
      rows.push(<tr key={"r"+i}>{row}</tr>);
    }
    return(
      <div>
        <table className="table-style">
          <tbody className="cell">
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class CellNoInput extends Component {
  render() {
    return(
      <input
        className="cell-input"
        type="text"
        maxLength="1"
        value={this.props.value}
        readOnly="true"
      />
    );
  }
}

class CellInput extends Component {
  constructor(props) {
    super(props);
    this.isNumber = this.isNumber.bind(this);
  }

  isNumber(event) {
    var keycode = (event.which) ? event.which : event.keyCode;
    if (keycode > 31 && (keycode < 48 || keycode > 57)) {
      event.preventDefault();
      return;
    }
  }

  render() {
    return(
      <input
        className="cell-input"
        type="text"
        maxLength="1"
        defaultValue=""
        onKeyPress={this.isNumber}
      />
    );
  }
}

export default Board;