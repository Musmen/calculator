import React from 'react';
import ReactDOM from 'react-dom';

function InfoCard(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <p>{props.msrp}</p>
      <p>{props.vehicleName}</p>
      <p>{props.dealer.name}</p>
      <p>{props.dealer.phone}</p>
      <p>{props.dealer.rating}</p>
      <p>{props.taxes}</p>
      <p>{props.monthlyPayment}</p>
    </div>
  );
}

export default InfoCard;
