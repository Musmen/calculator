import React from 'react';

class InputList extends React.Component {
  render() {
    const propsNames = ['downPayment', 'tradeIn', `${this.props.folder}PostCode`];
    return propsNames.map((item) => (
      <input
        type='number'
        value = {this.props[item]}
        name = {item}
        onChange = {this.props.handleChange}
        key = {item}
        className={`input ${this.props.folder}--input ${this.props.folder}--input-${item}`}
      />
    ))
  }
}

export default InputList;
