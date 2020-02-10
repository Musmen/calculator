import React from 'react';

function InfoCard(props) {
  const {
    msrp, vehicleName, dealer, taxes, monthlyPayment,
  } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <p>{msrp}</p>
      <p>{vehicleName}</p>
      <p>{dealer.name}</p>
      <p>{dealer.phone}</p>
      <p>{dealer.rating}</p>
      <p>{taxes}</p>
      <p>{monthlyPayment}</p>
    </div>
  );
}

export default InfoCard;
