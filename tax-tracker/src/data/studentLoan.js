import studentLoanRates from './staticData/studentLoanRates.json';

export const studentLoan = ({ salary, type, year }) => {
  const slRate = studentLoanRates[year];

  if (type === "none") return 0;
  
  const studentLoanThreshold = slRate[type];

  if (salary < studentLoanThreshold) return 0;
  
  return (salary - studentLoanThreshold) * 0.09
};
