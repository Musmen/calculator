import './inputList.scss';

import React from 'react';
import STATE_NAME_TO_STRING_NAME from '../main/js/data/helper';

class InputList extends React.Component {
  render() {
    const { folder, handleChange, validationError } = this.props;
    const propsNames = ['downPayment', 'tradeIn', `${folder}PostCode`];
    const currencySign = <span className = 'currencySign'>$</span>;

    return (
      <>
        {propsNames.map((item) => (
            <p key = {item} className = {validationError[item] ? 'error' : ''}>
              <label className = 'label'>
                {`${STATE_NAME_TO_STRING_NAME[item]} `}
                {validationError[item] ? validationError[item] : ''}<br/>
                {item !== `${folder}PostCode` ? currencySign : null}
                <input
                  type ='number'
                  value = {this.props[item]}
                  name = {item}
                  onChange = {handleChange}
                  className = {`input ${folder}--input ${folder}--input-${item}${validationError[item] ? ' error' : ''}`}
                  // className = {validationError[item] ? 'error' : ''}
                  min = {0}
                  max = {999999999}
                />
              </label>
            </p>
        ))}
      </>
    );
  }
}

export default InputList;
