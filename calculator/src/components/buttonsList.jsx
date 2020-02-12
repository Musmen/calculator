import './buttonList.scss';

import React from 'react';
import PropTypes from 'prop-types';

class ButtonsList extends React.Component {
  render() {
    const {
      valueList, folderName, propertyName, onClick, value,
    } = this.props;

    return (
      <>
        {valueList.map((item, index) => (
          <li key = {index}>
            <button
              type = 'button'
              value = {item}
              name = {propertyName}
              onClick = {onClick}
              className = {
                `button
                ${folderName}--button
                ${folderName}--button-${propertyName}${item}
                ${value === item ? 'button-active' : ''}`
              }
            >
              {item}
            </button>
          </li>
        ))}
      </>
    );
  }
}

ButtonsList.propTypes = {
  valueList: PropTypes.array.isRequired,
  folderName: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonsList;
