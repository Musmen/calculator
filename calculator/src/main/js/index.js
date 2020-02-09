import '../css/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Loan from '../../components/loan';
import Lease from '../../components/lease';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      downPayment: 0,
      tradeIn: 0,
      apr: 0,
      loanPostCode: 212025,
      leasePostCode: 212025,
      loanTerm: 24,
      leaseTerm: 36,
      creditScore: 750,
      mileages: 12000,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    const stateName = evt.target.name;
    console.log(`Previous: ${this.state[evt.target.name]}`);

    this.setState({ [evt.target.name]: +evt.target.value });
    setTimeout(() => {
      console.log(`New: ${this.state[stateName]}`);
    }, 0);
  }

  handleClick(evt) {
    const stateName = evt.target.name;
    console.log(`Previous: ${this.state[evt.target.name]}`);

    this.setState({ [evt.target.name]: evt.target.value });

    setTimeout(() => {
      console.log(`New: ${this.state[stateName]}`);
    }, 0);
  }

  render() {
    return (
      <div>
        <Loan
          downPayment = {this.state.downPayment}
          tradeIn = {this.state.tradeIn}
          loanPostCode = {this.state.loanPostCode}
          apr = {this.state.apr}
          term = {this.state.loanTerm}
          creditScore = {this.state.creditScore}
          handleChange = {this.handleChange}
          handleClick = {this.handleClick}
          handleCreditScoreBtnClick = {this.handleCreditScoreBtnClick}
        />
        <br/>
        <br/>
        <Lease
          downPayment = {this.state.downPayment}
          tradeIn = {this.state.tradeIn}
          leasePostCode = {this.state.leasePostCode}
          term = {this.state.leaseTerm}
          mileages = {this.state.mileages}
          creditScore = {this.state.creditScore}
          handleChange = {this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator/>,
  document.getElementById('root'),
);
