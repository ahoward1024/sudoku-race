import React, {Component} from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  render() {
    const height = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const width = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const dimension = Math.min(width, height);
    let cellSize = dimension;
    const multi = dimension / 6 * 2;
    cellSize -= multi;
    cellSize /= 9;
    // This value scales the text of the sudoku board
    const textScale = 0.65;

    return (
      <div>
        <h1 id="heading" align="center">Sudoku Race</h1>
        <div id="bdiv">
          <Board url="https://sudokurace.io/game.create" cellSize={cellSize} textScale={textScale}/>
        </div>
      </div>
    );
  }
}

export default App;
