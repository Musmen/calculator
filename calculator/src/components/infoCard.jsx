import React from 'react';
import PropTypes from 'prop-types';

function InfoCard(props) {
  const {
    msrp, vehicleName, dealer, taxes, monthlyPayment,
  } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <p>MSRP: {msrp}</p>
      <p>Vehicle Name: {vehicleName}</p>
      <p>Dealer Name: {dealer.name}</p>
      <p>Dealer Phone: {dealer.phone}</p>
      <p>Dealer Rating: {dealer.rating}</p>
      <p>Taxes: {taxes}</p>
      <p>Monthly Payment: {monthlyPayment}$</p>
    </div>
  );
}

InfoCard.propTypes = {
  msrp: PropTypes.number,
  vehicleName: PropTypes.string,
  dealer: PropTypes.object,
  taxes: PropTypes.array,
  monthlyPayment: PropTypes.number,
};

export default InfoCard;
