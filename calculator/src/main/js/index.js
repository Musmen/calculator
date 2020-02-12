import '../css/index.scss';

import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Loan from '../../components/loan';
import Lease from '../../components/lease';
import InfoCard from '../../components/infoCard';
import FolderButtons from '../../components/folderButtons';
import Spinner from '../../components/spinner';
import AprInput from '../../components/aprInput.jsx';

import MOCH_INFO_CARD_DATA from './data/mochInfoCardData';
import { getTaxes, calculateLoanMonthlyPayment, calculateLeaseMonthlyPayment } from './data/utils';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      downPayment: JSON.parse(localStorage.getItem('downPayment')) || 0,
      tradeIn: JSON.parse(localStorage.getItem('tradeIn')) || 0,
      apr: JSON.parse(localStorage.getItem('apr')) || 0,
      loanPostCode: JSON.parse(localStorage.getItem('loanPostCode')) || 212025,
      leasePostCode: JSON.parse(localStorage.getItem('leasePostCode')) || 212025,
      loanTerm: JSON.parse(localStorage.getItem('loanTerm')) || 24,
      leaseTerm: JSON.parse(localStorage.getItem('leaseTerm')) || 36,
      creditScore: JSON.parse(localStorage.getItem('creditScore')) || 750,
      mileages: JSON.parse(localStorage.getItem('mileages')) || 12000,
      isLoan: ((JSON.parse(localStorage.getItem('isLoan')) !== false) || false),
      error: null,
      isLoading: ((JSON.parse(localStorage.getItem('isLoading')) !== false) || false),
      infoCardData: JSON.parse(localStorage.getItem('infoCardData')) || { msrp: 0 },
      monthlyPayment: JSON.parse(localStorage.getItem('monthlyPayment')) || null,
      taxes: JSON.parse(localStorage.getItem('taxes')) || null,
      validationError: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  validateInput() {
    const { validationError } = this.state;
    return !(validationError.downPayment || validationError.tradeIn);
  }

  validateField(fieldName, value) {
    if (!['downPayment', 'tradeIn'].includes(fieldName)) return;

    const maxValue = this.state.infoCardData.msrp / 4;
    const errorMessage = `value can’t be greater than ${Math.round(maxValue)} (1/4 * MSRP)`;
    const { validationError } = this.state;

    validationError[fieldName] = (value > maxValue) ? errorMessage : false;
    this.setState({ validationError });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: +evt.target.value },
      this.validateField(evt.target.name, evt.target.value));
  }

  handleClick(evt) {
    this.setState({ [evt.target.name]: +evt.target.value });
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
            loanPostCode: +data.postal,
            leasePostCode: +data.postal,
            infoCardData: mochData,
            isLoading: false,
            error: null,
          },
        );
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
    const isValid = this.validateInput();
    if (!isValid) return;
    if (JSON.stringify(this.state) !== JSON.stringify(previousState)) {
      const monthlyPayment = await this.calculateMonthlyPayment();
      const taxes = await this.calculateTaxes();
      this.setState({ monthlyPayment, taxes });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveStateToLocalStorage);
  }

  saveStateToLocalStorage() {
    Object.keys(this.state).forEach((stateKey) => {
      localStorage.setItem(stateKey, JSON.stringify(this.state[stateKey]));
    });
  }

  componentDidMount() {
    if (this.state.isLoading) {
      const token = '6ec8da2c7f1243';
      const serviceURL = `https://ipinfo.io/json?token=${token}`;
      this.loadData(serviceURL);
    }

    const { downPayment, tradeIn } = this.state;
    this.validateField('downPayment', downPayment);
    this.validateField('tradeIn', tradeIn);

    window.addEventListener('beforeunload', this.saveStateToLocalStorage);
  }

  render() {
    const {
      downPayment, tradeIn, apr, loanPostCode, leasePostCode, loanTerm, leaseTerm,
      creditScore, mileages, isLoan, error, isLoading, infoCardData, monthlyPayment, taxes,
      validationError,
    } = this.state;

    if (error) { // !todo! styles for Error Message!
      return <div>{`Stop! ${error}`}</div>;
    }

    if (isLoading) {
      return <Spinner/>;
    }

    let mainFolder;

    if (isLoan) {
      mainFolder = <Loan
        downPayment = {downPayment}
        tradeIn = {tradeIn}
        loanPostCode = {loanPostCode}
        apr = {apr}
        term = {loanTerm}
        creditScore = {creditScore}
        handleChange = {this.handleChange}
        handleClick = {this.handleClick}
        validationError = {validationError}
        renderAprInput = {AprInput}
      />;
    } else {
      mainFolder = <Lease
        downPayment = {downPayment}
        tradeIn = {tradeIn}
        leasePostCode = {leasePostCode}
        term = {leaseTerm}
        mileages = {mileages}
        creditScore = {creditScore}
        handleChange = {this.handleChange}
        validationError = {validationError}
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
