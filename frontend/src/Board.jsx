import React, { Component } from 'react';
import './Board.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {board: ""};
  }

  componentDidMount() {
    fetch('http://192.168.0.21:8080/game.create')
      .then(resp => resp.json())
      .then(json => json["board"].split(""))
      .then(board => this.setState({ board }))
      .catch(function(resp) {
        console.log("Error getting response from server: " + resp)
      })
  }

  render() {
    var rows = [];
    var pos = 0;
    var it = 1;
    for(var i = 0; i < 9; ++i) {
      var row = [];
      for(var j = 0; j < 9; ++j) {
        var val = this.state.board[pos];
        // NOTE/FIXME(alex): Without (val === undefined) React will complain that the CellNoInput
        // is an uncontrolled component that is being switched to a controlled component.
        if(val === ' ' || val === undefined) {
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
        className="cell-input noinput"
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