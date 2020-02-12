import './lease.scss';

import React from 'react';
import PropTypes from 'prop-types';

import InputList from './inputList.jsx';
import Select from './select.jsx';

class Lease extends React.Component {
  render() {
    const termList = [24, 36, 48];
    const mileagesList = [10000, 12000, 15000];
    const creditScoreList = [600, 650, 700, 750, 800, 850, 900];

    const TermsSelect = <Select
      valueList = {termList}
      propertyName = 'leaseTerm'
      value = {this.props.term}
      onChange = {this.props.handleChange}
    />;

    const MileagesSelect = <Select
      valueList = {mileagesList}
      propertyName = 'mileages'
      value = {this.props.mileages}
      onChange = {this.props.handleChange}
    />;

    const CreditScoresSelect = <Select
      valueList = {creditScoreList}
      propertyName = 'creditScore'
      value = {this.props.creditScore}
      onChange = {this.props.handleChange}
    />;

    return (
      <div className = 'lease_container'>
        <InputList
          tradeIn = {this.props.tradeIn}
          downPayment = {this.props.downPayment}
          leasePostCode = {this.props.leasePostCode}
          handleChange = {this.props.handleChange}
          folder='lease'
          validationError = {this.props.validationError}
        />

        <div className = 'select_container'>
          <p>
            Terms:<br/>
            {TermsSelect}
          </p>
          <p>
            Mileages:<br/>
            {MileagesSelect}
          </p>
          <p>
            CreditScore:<br/>
            {CreditScoresSelect}
          </p>
        </div>
      </div>
    );
  }
}

Lease.propTypes = {
  downPayment: PropTypes.number.isRequired,
  tradeIn: PropTypes.number.isRequired,
  leasePostCode: PropTypes.number.isRequired,
  term: PropTypes.number.isRequired,
  mileages: PropTypes.number.isRequired,
  creditScore: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  validationError: PropTypes.object,
};

export default Lease;
