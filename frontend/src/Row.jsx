import React, { Component } from 'react';

class Row extends Component {
  render() {
    var cols = this.props.cols;
    var data = this.props.data;
    var td = function(item) {
      return cols.map(function(c , i) {
        return <td key={i}>{item[c]}</td>;
      }, this);
    }.bind(this);

    return(
      <div>
        <tr key={data}>{ td(data) }</tr>
      </div>
    )
  }
}

export default Row;
