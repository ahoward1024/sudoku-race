import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div>
        <h1 align="center">Sudoku Race</h1>
        <div className="container">
        <div className="square-div">
          <Board/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
