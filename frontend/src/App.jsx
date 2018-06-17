import React, {Component} from 'react';
import './App.css';
import Board from './Board';

class App extends Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1 id="heading" align="center">Sudoku Race</h1>
        <Board/>
      </div>
    );
  }
}

export default App;
