import React from 'react';
import ReactDOM from 'react-dom';

import InputList from './inputList';
import ButtonsList from './buttonsList';

class Loan extends React.Component {
  renderAprInput() {
    return (
      <>
      <p>
        <label>
          Apr<br/>
          <input
            className = 'input loan--input loan--input-apr'
            type = 'number'
            value = {this.props.apr}
            name = 'apr'
            onChange = {this.props.handleChange}
            min = {0}
            max = {999999999}
          >
          </input>
        </label>
      </p>
      </>
    );
  }

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
      <form>
        <InputList
          tradeIn = {this.props.tradeIn}
          downPayment = {this.props.downPayment}
          loanPostCode = {this.props.loanPostCode}
          handleChange = {this.props.handleChange}
          folder = 'loan'
          validationError = {this.props.validationError}
        />
        {this.renderAprInput()}
        <br/>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
          Terms: {TermsButtonsList}
        </ul>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
          Credit Score: {CreditScoresButtonsList}
        </ul>
      </form>
    );
  }
}

export default Loan;
