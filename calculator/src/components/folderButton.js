import React from 'react';

function FolderButton(props) {
  const { isLoan, handleClick } = props;

  return (
    <button
      type = 'button'
      value = {!isLoan}
      name = 'isLoan'
      onClick = {handleClick}
    >
      {isLoan ? 'Lease' : 'Loan'}
    </button>
  );
}

export default FolderButton;
