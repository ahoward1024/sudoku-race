import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      outer: {
        left: 10,
        top: 10,
        width: 0,
        height: 0
      },
      inner: {
        left: 20,
        top: 20,
        width: 0,
        height: 0,
      }
    };
    this.layout = this.layout.bind(this);
  }

  componentDidMount() {
    this.layout();
    window.addEventListener("resize", this.layout);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.layout);
  }

  layout() {
    var pad = 100;

    var head = document.getElementById("heading");
    var styles = window.getComputedStyle(head);
    var margin = parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);
    var outer_w = window.innerWidth;
    var outer_h = window.innerHeight - (margin * 2);

    const base = 500;
    var scale = Math.min((outer_w - pad) / base, (outer_h - pad) / base);
    var size = base * scale;
    const max = 800;
    if(size > max) size = max;
    var inner_w = size;
    var inner_h = size;

    this.setState({
      outer: {
        left: 0, 
        top: margin * 2, 
        width: outer_w, 
        height: outer_h
      },
      inner: {
        left: ((outer_w / 2) - (inner_w / 2)), 
        top: ((outer_h / 2) - (inner_h / 2)),
        width: inner_w, 
        height: inner_h}
      }
    );
  }

  render() {
    return (
      <div>
        <h1 id="heading" align="center">Sudoku Race</h1>
        <div className="outer" style={this.state.outer}>
          <div id="square" className="inner" style={this.state.inner}>
            <Board width={this.state.inner.width} height={this.state.inner.height}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
