function getTaxes(postCode) {
  return postCode.toString().split('').map((item) => `${(item * 11) || ''} `);
}

function calculateCreditValue(creditScore) {
  let creditScoreValue;
  if (creditScore >= 750) {
    creditScoreValue = 0.95;
  } else if (creditScore >= 700) {
    creditScoreValue = 1;
  } else if (creditScore >= 640) {
    creditScoreValue = 1.05;
  } else {
    creditScoreValue = 1.2;
  }
  return creditScoreValue;
}

function calculateLoanMonthlyPayment(msrp, tradeIn, downPayment, loanTerm, creditScore, apr) {
  const creditScoreValue = calculateCreditValue(creditScore);
  return ((msrp - tradeIn - downPayment) * (apr / 100) * creditScoreValue) / loanTerm;
}

function calculateLeaseMonthlyPayment(msrp, tradeIn, downPayment, leaseTerm, creditScore, mileage) {
  const creditScoreValue = calculateCreditValue(creditScore);
  return ((msrp - tradeIn - downPayment) * mileage * creditScoreValue) / (10000 * leaseTerm);
}

export { getTaxes, calculateLoanMonthlyPayment, calculateLeaseMonthlyPayment };
