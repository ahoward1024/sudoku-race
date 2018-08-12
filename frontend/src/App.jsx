import React, {Component} from 'react';
import './App.css';
import Board from './Board';

const URL = 'https://sudokurace.io';

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
    // We should get the smallest dimension of the window and use that as a basis for scaling.
    const dimension = Math.min(width, height);
    let cellSize = dimension;
    // Here we divide by 6 to scale to 1/6th of the window size and then multiply by two because we
    // are using this as a padding value for both the top/bottom or left/right of the screen.
    const padding = dimension / 6 * 2;
    // We then subtract out the padding value from the actual size of the cell.
    cellSize -= padding;
    // We then divide by 9 because we will have 9 cells in each direction. The above calculations
    // calculate an appropriate _board_ size based on 1/6th of the window and padding. Dividing by
    // 9 gives us the appropriate size for each cell.
    cellSize /= 9;
    // This value scales the text of the sudoku board. I felt that 0.65 was a nice size that filled
    // the input box very nicely to where the text was big but not overwhelming the element.
    // This is parameterized so we can quickly find it and change it in the future if need be
    // such as if we want to change fonts.
    const textScale = 0.85;

    return (
      <div>
        <h1 id="heading" align="center">Sudoku Race</h1>
        <div id="bdiv">
          <Board url={URL} cellSize={cellSize} textScale={textScale}/>
        </div>
      </div>
    );
  }
}

export default App;
