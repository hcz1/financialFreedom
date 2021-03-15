import studentLoanRates from './staticData/studentLoanRates.json';

export const studentLoan = ({ salary, type, year }) => {
  const yearValues = studentLoanRates[year];

  if (type === "none") return 0;
  
  const slplan = yearValues[type];

  if (salary < slplan.threshold) return 0;
  
  return (salary - slplan.threshold) * slplan.rate;
};
