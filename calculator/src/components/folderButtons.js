import React from 'react';

function FolderButtons(props) {
  const { isLoan, handleClick } = props;

  return (
    // <button
    //   type = 'button'
    //   value = {!isLoan}
    //   name = 'isLoan'
    //   onClick = {handleClick}
    // >
    //   {isLoan ? 'Lease' : 'Loan'}
    // </button>
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

export default FolderButtons;
