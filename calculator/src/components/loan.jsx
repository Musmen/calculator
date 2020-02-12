import './loan.scss';

import React from 'react';
import PropTypes from 'prop-types';

import InputList from './inputList.jsx';
import ButtonsList from './buttonsList.jsx';

class Loan extends React.Component {
  render() {
    const termList = [12, 24, 36, 48, 72, 84];
    const creditScoreList = [600, 650, 700, 750, 800, 850, 900];

    const TermsButtonsList = <ButtonsList
      valueList = {termList}
      folderName = 'loan'
      propertyName = 'loanTerm'
      value = {this.props.term}
      onClick = {this.props.handleClick}
    />;

    const CreditScoresButtonsList = <ButtonsList
      valueList = {creditScoreList}
      folderName = 'loan'
      propertyName = 'creditScore'
      value = {this.props.creditScore}
      onClick = {this.props.handleClick}
    />;

    return (
      <div className = 'loan_container'>
        <div className = 'left_box'>
          <InputList
            tradeIn = {this.props.tradeIn}
            downPayment = {this.props.downPayment}
            loanPostCode = {this.props.loanPostCode}
            handleChange = {this.props.handleChange}
            folder = 'loan'
            validationError = {this.props.validationError}
          />
        </div>

        <div className = 'right_box'>
          {this.props.renderAprInput(this.props.apr, this.props.handleChange)}
          Terms:
          <ul className = 'list terms_list'>
            {TermsButtonsList}
          </ul>
          Credit Score:
          <ul className = 'list credit_score_list'>
            {CreditScoresButtonsList}
          </ul>
        </div>
      </div>
    );
  }
}

Loan.propTypes = {
  downPayment: PropTypes.number.isRequired,
  tradeIn: PropTypes.number.isRequired,
  loanPostCode: PropTypes.number.isRequired,
  apr: PropTypes.number.isRequired,
  term: PropTypes.number.isRequired,
  creditScore: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  validationError: PropTypes.object,
  renderAprInput: PropTypes.func.isRequired,
};

export default Loan;
