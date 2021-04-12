import MortgageCalc from 'tiny-mortgage';
export const generateRepayment = ({ principle, deposit, rate, term, debt }) => {
  const m = new MortgageCalc(principle, deposit, rate, term);
  const yearly = [debt];
  for (let i = 12; i <= term * 12; i += 12) {
    yearly.push(m.getSpecificMonth(i).newLoanAmount);
  }
  return {
    monthly: m.monthlyPayment,
    totalInterest: m.getTotal() - debt,
    totalPayed: m.getTotal(),
    yearly,
  };
};

export const generateInterest = ({ debt, rate, term }) => {
  const monthly = debt * (rate / 100 / 12);
  const termInMonths = term * 12;
  const totalInterest = termInMonths * monthly;
  return {
    monthly,
    totalInterest,
    totalPayed: debt + totalInterest,
    yearly: Array.from({ length: term + 1 }).map(() => debt),
  };
};
