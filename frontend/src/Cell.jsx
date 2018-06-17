import React, {Component} from 'react';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.isNumber = this.isNumber.bind(this);
  }

  isNumber(event) {
    const keycode = event.which ? event.which : event.keyCode;
    if (keycode > 31 && (keycode < 48 || keycode > 57)) {
      event.preventDefault();

    }
  }

  render() {
    let style;
    if (this.props.readOnly) {
      style = 'cell-input';
    } else {
      style = 'cell-input noinput';
    }

return (
      <input className={style} value={this.props.value}/>
    );
  }
}

export default Cell;
