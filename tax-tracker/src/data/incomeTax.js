import yearlyRate from './yearlyRates.json';

export const generateIncomeTax = ({ salary, year }) => {
  const yearRate = yearlyRate[year];

  const noPersonalAllowenceSalary =
    yearRate.incomeLimitPersonalAllowence + yearRate.personalAllowance * 2;

  const adjustedPersonalAllowence =
    salary <= yearRate.incomeLimitPersonalAllowence
      ? yearRate.personalAllowance
      : salary >= noPersonalAllowenceSalary
      ? 0
      : yearRate.personalAllowance -
        Math.floor((salary - yearRate.incomeLimitPersonalAllowence) / 2);

  let band1 = 0;
  let band2 = 0;
  let band3 = 0;

  //How much is in first bracket
  if (salary >= yearRate.basicRate + yearRate.personalAllowance) {
    band1 = yearRate.basicRate;
  } else if (salary > yearRate.personalAllowance) {
    band1 = salary - adjustedPersonalAllowence;
  } else {
    band1 = 0;
  }

  //How much is in second bracket
  if (salary >= yearRate.higherRate) {
    band2 = yearRate.higherRate - yearRate.basicRate;
  } else if (salary >= yearRate.basicRate + yearRate.personalAllowance) {
    band2 = salary - adjustedPersonalAllowence - yearRate.basicRate;
  } else {
    band2 = 0;
  }

  //How much is in third bracket
  if (salary >= yearRate.higherRate) {
    band3 = salary - yearRate.higherRate;
  } else {
    band3 = 0;
  }

  const taxBracket1 = band1 * 0.2;
  const taxBracket2 = band2 * 0.4;
  const taxBracket3 = band3 * 0.45;

  const totalIncomeTax = taxBracket1 + taxBracket2 + taxBracket3;
  const takeHome = salary - totalIncomeTax;
  const totalTaxable =
    (salary - adjustedPersonalAllowence < 0)
      ? 0
      : salary - adjustedPersonalAllowence;

  return {
    totalTaxable: totalTaxable,
    taxBand1: taxBracket1,
    taxBand2: taxBracket2,
    taxBand3: taxBracket3,
    total: takeHome,
    allowance: yearRate.personalAllowance - adjustedPersonalAllowence,
  };
};
