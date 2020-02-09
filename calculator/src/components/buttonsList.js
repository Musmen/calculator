import React from 'react';

class ButtonsList extends React.Component {
  render() {
    const { valueList, folderName, propertyName, value, onClick } = this.props;
    return (
      <>
        {valueList.map((item, index) => ( // todo in dependant of value set activeState
          <li key = {index}>
            <button
              type = 'button'
              value = {item}
              name = {`${propertyName}`}
              onClick = {onClick}
              className = {`button ${folderName}--button ${folderName}--button-${propertyName}${item}`}
            >
              {item}
            </button>
          </li>
        ))}
      </>
    );
  }
}

export default ButtonsList;
