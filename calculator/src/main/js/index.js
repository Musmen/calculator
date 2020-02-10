import '../css/index.scss';

import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Loan from '../../components/loan';
import Lease from '../../components/lease';
import InfoCard from '../../components/infoCard';
import FolderButtons from '../../components/folderButtons';
import Spinner from '../../components/spinner';

import MOCH_INFO_CARD_DATA from './data/mochInfoCardData';
import { getTaxes, calculateLoanMonthlyPayment, calculateLeaseMonthlyPayment } from './data/utils';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      downPayment: 0,
      tradeIn: 0,
      apr: 0,
      loanPostCode: null,
      leasePostCode: null,
      loanTerm: 24,
      leaseTerm: 36,
      creditScore: 750,
      mileages: 12000,
      isLoan: true,
      error: null,
      isLoading: true,
      infoCardData: null,
      monthlyPayment: null,
      taxes: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleState = this.toggleState.bind(this);
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

  toggleState(evt) {
    this.setState({ [evt.target.name]: evt.target.value === 'true' });
  }

  async loadData(url) {
    const response = await fetch(url);
    if (response.status !== 200) {
      this.setState({ isLoading: false, error: 'Server or request error' });
    } else {
      try {
        const data = await response.json();
        const mochData = await MOCH_INFO_CARD_DATA;
        this.setState(
          {
            loanPostCode: data.postal,
            leasePostCode: data.postal,
            infoCardData: mochData,
            isLoading: false,
          },
        );
        // const monthlyPayment = await this.calculateMonthlyPayment();
        // this.setState({ monthlyPayment });
      } catch (error) {
        this.setState({ isLoading: false, error });
      }
    }
  }

  calculateTaxes() {
    const { isLoan, loanPostCode, leasePostCode } = this.state;
    const taxes = isLoan ? getTaxes(loanPostCode) : getTaxes(leasePostCode);
    return Promise.resolve(taxes);
  }

  calculateMonthlyPayment() {
    const {
      downPayment, tradeIn, apr, loanTerm, leaseTerm,
      creditScore, mileages, isLoan, infoCardData,
    } = this.state;

    let monthlyPayment;
    if (isLoan) {
      monthlyPayment = calculateLoanMonthlyPayment(
        infoCardData.msrp,
        tradeIn,
        downPayment,
        loanTerm,
        creditScore,
        apr,
      );
    } else {
      monthlyPayment = calculateLeaseMonthlyPayment(
        infoCardData.msrp,
        tradeIn,
        downPayment,
        leaseTerm,
        creditScore,
        mileages,
      );
    }

    return Promise.resolve(monthlyPayment);
  }

  async componentDidUpdate(prevProps, previousState) {
    if (JSON.stringify(this.state) !== JSON.stringify(previousState)) {
      const monthlyPayment = await this.calculateMonthlyPayment();
      // this.monthlyPayment = await this.calculateMonthlyPayment();
      // this.taxes = await this.calculateTaxes();
      const taxes = await this.calculateTaxes();
      this.setState({ monthlyPayment, taxes });
    }
  }

  componentDidMount() {
    const token = '6ec8da2c7f1243';
    const serviceURL = `https://ipinfo.io/json?token=${token}`;

    this.loadData(serviceURL);
    // const monthlyPayment = await this.calculateMonthlyPayment();
    // this.setState({ monthlyPayment });

    // fetch(serviceURL)
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       this.setState({ isLoading: false, error: 'Server or request error' });
    //     }
    //     return response.json();
    //   })
    //   .then(
    //     (result) => this.setState(
    //       {
    //         loanPostCode: result.postal,
    //         leasePostCode: result.postal,
    //         isLoading: false,
    //       },
    //     ),
    //     (error) => {
    //       console.log(error);
    //       this.setState({ isLoading: false, error });
    //     },
    //   );
  }

  // folderButton(isLoan) {
  //   return (
  //     <button
  //       type = 'button'
  //       value = {!isLoan}
  //       name = 'isLoan'
  //       onClick = {this.toggleState}
  //     >
  //       {isLoan ? 'Lease' : 'Loan'}
  //     </button>
  //   );
  // }

  render() {
    const {
      downPayment, tradeIn, apr, loanPostCode, leasePostCode, loanTerm, leaseTerm,
      creditScore, mileages, isLoan, error, isLoading, infoCardData, monthlyPayment, taxes,
    } = this.state;

    // let { monthlyPayment } = this.state;

    if (error) {
      return <div>{`Stop! ${error}`}</div>;
    }
    if (isLoading) {
      // return <div>Loading...</div>;
      return <Spinner/>;
    }
    // this.calculateMonthlyPayment().then(
    //   (value) => {
    //     monthlyPayment = value;
    //   },
    // );
    // let taxes;
    let mainFolder;
    // let monthlyPayment;

    if (isLoan) {
      // taxes = getTaxes(loanPostCode);
      // monthlyPayment = calculateLoanMonthlyPayment(
      //   infoCardData.msrp,
      //   tradeIn,
      //   downPayment,
      //   loanTerm,
      //   creditScore,
      //   apr,
      // );
      // debugger;
      mainFolder = <Loan
        downPayment = {downPayment}
        tradeIn = {tradeIn}
        loanPostCode = {loanPostCode}
        apr = {apr}
        term = {loanTerm}
        creditScore = {creditScore}
        handleChange = {this.handleChange}
        handleClick = {this.handleClick}
        // handleCreditScoreBtnClick = {this.handleCreditScoreBtnClick}
      />;
    } else {
      // taxes = getTaxes(leasePostCode);
      // monthlyPayment = calculateLeaseMonthlyPayment(
      //   infoCardData.msrp,
      //   tradeIn,
      //   downPayment,
      //   leaseTerm,
      //   creditScore,
      //   mileages,
      // );
      mainFolder = <Lease
        downPayment = {downPayment}
        tradeIn = {tradeIn}
        leasePostCode = {leasePostCode}
        term = {leaseTerm}
        mileages = {mileages}
        creditScore = {creditScore}
        handleChange = {this.handleChange}
      />;
    }

    return (
      <div>
        <FolderButtons
          isLoan={isLoan}
          handleClick={this.toggleState}
        />
        {mainFolder}
        <br/>
        <InfoCard
          msrp = {infoCardData.msrp}
          vehicleName = {infoCardData.vehicleName}
          dealer = {infoCardData.dealer}
          taxes = {taxes}
          monthlyPayment = {monthlyPayment}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator/>,
  document.getElementById('root'),
);
