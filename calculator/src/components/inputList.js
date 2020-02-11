import React from 'react';

class InputList extends React.Component {
  render() {
    const propsNames = ['downPayment', 'tradeIn', `${this.props.folder}PostCode`];
    return (
      <>
        {propsNames.map((item) => (
            <p key = {item}>
              <input
                type='number'
                value = {this.props[item]}
                name = {item}
                onChange = {this.props.handleChange}
                className={`input ${this.props.folder}--input ${this.props.folder}--input-${item}`}
              />
              {this.props.validationError[item] ? this.props.validationError[item] : ''}
            </p>
        ))}
      </>
    );
  }
}

export default InputList;
