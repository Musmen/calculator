function getTaxes(postCode) {
  return postCode.toString().split('').map((item) => `${item * 11} `);
}

function calculateLoanMonthlyPayment(msrp, tradeIn, downPayment, loanTerm, creditScore, apr) {
  return ((msrp - tradeIn - downPayment) * apr * creditScore) / loanTerm;
}

function calculateLeaseMonthlyPayment(msrp, tradeIn, downPayment, leaseTerm, creditScore, mileage) {
  return ((msrp - tradeIn - downPayment) * mileage * creditScore) / (10000 * leaseTerm);
}

export { getTaxes, calculateLoanMonthlyPayment, calculateLeaseMonthlyPayment };
