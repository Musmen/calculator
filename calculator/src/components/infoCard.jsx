import './infoCard.scss';

import React from 'react';
import PropTypes from 'prop-types';

function InfoCard(props) {
  const {
    msrp, vehicleName, dealer, taxes, monthlyPayment,
  } = props;

  return (
    <div className = 'infoCard--container'>
      <p className = 'taxes'>
        <span className = 'taxes--title title-span'>
          Taxes:
        </span><br/>
        {taxes}
      </p>
      <div className = 'infoCard--flex'>
        <div className = 'infoCard--payments'>
          <p>
            <span className = 'monthlyPayment--title title-span'>
              Monthly Payment:
            </span><br/>
            <span className = 'monthlyPayment--value'>
              {Math.round(monthlyPayment * 100) / 100}$
            </span>
          </p>
          <p>
            <span className = 'title-span'>
              MSRP:
            </span><br/>
            {msrp}$
          </p>
          <p>
            <span className = 'title-span'>
              Vehicle Name:
            </span><br/>
            {vehicleName}
          </p>
        </div>
        <div className = 'infoCard--dealer'>
          <p>
            <span className = 'title-span'>
              Dealer Name:
            </span><br/>
            {dealer.name}
          </p>
          <p>
            <span className = 'title-span'>
              Dealer Phone:
            </span><br/>
            {dealer.phone}
          </p>
          <p>
            <span className = 'title-span'>
              Dealer Rating:
            </span><br/>
            {dealer.rating}
          </p>
        </div>
      </div>

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
