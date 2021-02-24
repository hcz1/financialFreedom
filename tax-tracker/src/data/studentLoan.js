export const studentLoan = ({ salary, type }) => {
  const studentLoanThreshold = type === 'plan_2' ? 26_568 : 19_380;

  if (type === "none") return 0;
  if (salary < studentLoanThreshold) return 0;
  
  return (salary - studentLoanThreshold) * 0.09
};
