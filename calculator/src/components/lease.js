import React from 'react';
import ReactDOM from 'react-dom';

import InputList from './inputList';
import Select from './select';

class Lease extends React.Component {
  render() {
    const termList = [24, 36, 48];
    const mileagesList = [10000, 12000, 15000];
    const creditScoreList = [600, 650, 700, 750, 800, 850, 900];
// todo заменить везде длинные this.props на деструктор и простые переменные
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
      <form>
        <InputList
          tradeIn = {this.props.tradeIn}
          downPayment = {this.props.downPayment}
          apr = {this.props.apr}
          leasePostCode = {this.props.leasePostCode}
          handleChange = {this.props.handleChange}
          folder='lease'
          validationError = {this.props.validationError}
        />
        <br/>Terms:<br/>
        {TermsSelect}
        <br/>Mileages:<br/>
        {MileagesSelect}
        <br/>CreditScore:<br/>
        {CreditScoresSelect}
      </form>
    );
  }
}

export default Lease;
