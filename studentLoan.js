const studentLoan = ({ salary }) => {
  const monthlySalary = salary / 12;
  const studentLoanThreshold = 2_214;
  if (monthlySalary < studentLoanThreshold) return { montlyLoanPayments: 0 };
  const studentLoanRate = 0.09;
  const montlyLoanPayments =
    (monthlySalary - studentLoanThreshold) * studentLoanRate;
  return {
    yearly: (montlyLoanPayments * 12).toFixed(2),
    montly: montlyLoanPayments.toFixed(2),
    weekly: (montlyLoanPayments / 4).toFixed(2),
  };
};

module.exports = {
  studentLoan,
};
