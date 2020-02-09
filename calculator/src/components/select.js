import React from 'react';

class Select extends React.Component {
  render() {
    const { valueList, propertyName, value, onChange } = this.props;

    return (
      <select
        value = {value}
        onChange = {onChange}
        name = {propertyName}
      >
        {valueList.map((item, index) => (
          <option value = {item} key = {index}>
            {item}
          </option>
        ))}
      </select>
    );
  }
}

export default Select;
