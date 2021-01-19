const studentLoan = ({ salary }) => {
  const monthlySalary = salary / 12;
  const studentLoanThreshold = 2_214;
  if (monthlySalary < studentLoanThreshold) return { montlyLoanPayments: 0 };
  const studentLoanRate = 0.09;
  const montlyLoanPayments =
    (monthlySalary - studentLoanThreshold) * studentLoanRate;
  return { montlyLoanPayments };
};

module.exports = {
  studentLoan,
};
