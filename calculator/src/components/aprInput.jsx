import React from 'react';

function AprInput(apr, onChange) {
  return (
    <>
    <p>
      <label className = 'label'>
        Apr<br/>
        <span className = 'beforeSign'>%</span>
        <input
          className = 'input loan--input loan--input-apr'
          type = 'number'
          value = {apr}
          name = 'apr'
          onChange = {onChange}
          min = {0}
          max = {999999999}
        >
        </input>
      </label>
    </p>
    </>
  );
}

export default AprInput;
