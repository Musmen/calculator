import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const {
      valueList, propertyName, value, onChange,
    } = this.props;

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

Select.propTypes = {
  valueList: PropTypes.array.isRequired,
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
