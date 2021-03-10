const yearlyRate = require('./staticData/yearlyRates2.json');

export const calculate = ({ salary = 0, year, country }) => {
  const {
    personalAllowance,
    incomeLimitPersonalAllowance,
    taxRates,
  } = yearlyRate[year][country];

  const rates = {};
  let totalIncomeTaxable = salary - personalAllowance;

  for (let i = 1; i < taxRates.length; i++) {
    const { taxableIncome: taxableIncomePrev } = taxRates[i - 1];
    const { name, rate, taxableIncome } = taxRates[i];
    const isHighestTaxRate = i + 1 === taxRates.length;
    if (salary >= taxableIncome) {
      if (!isHighestTaxRate) {
        rates[name] = (taxableIncome - taxableIncomePrev) * rate;
      } else {
        rates[name] = (salary - taxableIncome) * rate;
      }
    } else if (salary < taxableIncome && salary > taxableIncomePrev) {
      rates[name] = (salary - taxableIncomePrev) * rate;
    } else {
      rates[name] = 0;
    }
    // calculate the removal of personal allowance in the correct tax band
    if (taxableIncome > incomeLimitPersonalAllowance && !isHighestTaxRate) {
      if (salary >= incomeLimitPersonalAllowance + personalAllowance * 2) {
        rates[name] = (rates[name] / rate + personalAllowance) * rate;
        totalIncomeTaxable += personalAllowance;
      } else if (
        salary < incomeLimitPersonalAllowance + personalAllowance * 2 &&
        salary > incomeLimitPersonalAllowance + 1
      ) {
        rates[name] =
          (rates[name] / rate +
            Math.floor((salary - incomeLimitPersonalAllowance) / 2)) *
          rate;
        totalIncomeTaxable += Math.floor(
          (salary - incomeLimitPersonalAllowance) / 2
        );
      }
    }
  }
  return { rates, totalIncomeTaxable };
};
