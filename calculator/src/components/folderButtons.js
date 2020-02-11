import React from 'react';
import PropTypes from 'prop-types';

function FolderButtons(props) {
  const { isLoan, handleClick } = props;

  return (
    <>
      <button
        type = 'button'
        value = {true}
        name = 'isLoan'
        onClick = {handleClick}
        disabled = {isLoan}
      >
        Loan
      </button>
      <button
        type = 'button'
        value = {false}
        name = 'isLoan'
        onClick = {handleClick}
        disabled = {!isLoan}
      >
        Lease
      </button>
    </>
  );
}

FolderButtons.propTypes = {
  isLoan: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FolderButtons;
