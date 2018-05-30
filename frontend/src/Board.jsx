import React, { Component } from 'react';
import './Board.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  render() {
    return (
      <div>
      <table className="table-style">
      <tbody>
        <tr>
          <td id="c00" className="cell tl"><input id="f00" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c10" className="cell tm"><input id="f10" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c20" className="cell tr"><input id="f20" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c30" className="cell tl"><input id="f30" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c40" className="cell tm"><input id="f40" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c50" className="cell tr"><input id="f50" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c60" className="cell tl"><input id="f60" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c70" className="cell tm"><input id="f70" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c80" className="cell tr"><input id="f80" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c01" className="cell ml"><input id="f01" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c11" className="cell mm"><input id="f11" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c21" className="cell mr"><input id="f21" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c31" className="cell ml"><input id="f31" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c41" className="cell mm"><input id="f41" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c51" className="cell mr"><input id="f51" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c61" className="cell ml"><input id="f61" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c71" className="cell mm"><input id="f71" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c81" className="cell mr"><input id="f81" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c02" className="cell bl"><input id="f02" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c12" className="cell bm"><input id="f12" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c22" className="cell br"><input id="f22" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c32" className="cell bl"><input id="f32" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c42" className="cell bm"><input id="f42" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c52" className="cell br"><input id="f52" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c62" className="cell bl"><input id="f62" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c72" className="cell bm"><input id="f72" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c82" className="cell br"><input id="f82" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c03" className="cell tl"><input id="f03" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c13" className="cell tm"><input id="f13" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c23" className="cell tr"><input id="f23" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c33" className="cell tl"><input id="f33" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c43" className="cell tm"><input id="f43" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c53" className="cell tr"><input id="f53" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c63" className="cell tl"><input id="f63" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c73" className="cell tm"><input id="f73" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c83" className="cell tr"><input id="f83" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c04" className="cell ml"><input id="f04" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c14" className="cell mm"><input id="f14" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c24" className="cell mr"><input id="f24" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c34" className="cell ml"><input id="f34" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c44" className="cell mm"><input id="f44" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c54" className="cell mr"><input id="f54" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c64" className="cell ml"><input id="f64" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c74" className="cell mm"><input id="f74" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c84" className="cell mr"><input id="f84" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c05" className="cell bl"><input id="f05" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c15" className="cell bm"><input id="f15" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c25" className="cell br"><input id="f25" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c35" className="cell bl"><input id="f35" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c45" className="cell bm"><input id="f45" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c55" className="cell br"><input id="f55" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c65" className="cell bl"><input id="f65" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c75" className="cell bm"><input id="f75" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c85" className="cell br"><input id="f85" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c06" className="cell tl"><input id="f06" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c16" className="cell tm"><input id="f16" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c26" className="cell tr"><input id="f26" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c36" className="cell tl"><input id="f36" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c46" className="cell tm"><input id="f46" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c56" className="cell tr"><input id="f56" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c66" className="cell tl"><input id="f66" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c76" className="cell tm"><input id="f76" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c86" className="cell tr"><input id="f86" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c07" className="cell ml"><input id="f07" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c17" className="cell mm"><input id="f17" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c27" className="cell mr"><input id="f27" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c37" className="cell ml"><input id="f37" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c47" className="cell mm"><input id="f47" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c57" className="cell mr"><input id="f57" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c67" className="cell ml"><input id="f67" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c77" className="cell mm"><input id="f77" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c87" className="cell mr"><input id="f87" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
        <tr>
          <td id="c08" className="cell bl"><input id="f08" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c18" className="cell bm"><input id="f18" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c28" className="cell br"><input id="f28" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c38" className="cell bl"><input id="f38" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c48" className="cell bm"><input id="f48" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c58" className="cell br"><input id="f58" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c68" className="cell bl"><input id="f68" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c78" className="cell bm"><input id="f78" size="2" maxLength="1" className="cell-input"/></td>
          <td id="c88" className="cell br"><input id="f88" size="2" maxLength="1" className="cell-input"/></td>
        </tr>
      </tbody>
      </table>
      </div>
    );
  }
}

export default Board;
