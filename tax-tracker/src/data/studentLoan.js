export const studentLoan = ({ salary, type }) => {
  const studentLoanThreshold = type === 'plan_2' ? 26_568 : 19_380;

  if (type === "none") return 0;
  if (salary < studentLoanThreshold) return 0;
  
  return (salary - studentLoanThreshold) * 0.09

  /*const monthlySalary = salary / 12;
  const studentLoanThreshold = type === 'plan_2' ? 2_214 : 1_615;
  if (type === "none") return {montlyLoanPayments: 0 };
  if (monthlySalary < studentLoanThreshold) return { montlyLoanPayments: 0 };
  const studentLoanRate = 0.09;
  const montlyLoanPayments =
    (monthlySalary - studentLoanThreshold) * studentLoanRate;
  const yearlyLoanPayments = montlyLoanPayments * 12;
  
  return {
    yearly: yearlyLoanPayments,
    montly: montlyLoanPayments,
    weekly: yearlyLoanPayments / 52,
  };*/
};
