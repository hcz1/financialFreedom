import yearlyRate from './staticData/yearlyRates.json';

export const generateIncomeTax = ({ salary, year, scottish }) => {
  return !scottish
    ? getEnglandIncomeTax({ salary, year })
    : getScottishIncomeTax({ salary, year });
};
const getScottishIncomeTax = ({ salary, year }) => {
  const yearRate = yearlyRate[year];
  const yearRateScottish = yearlyRate[year].scotland;

  let starterRate = 0;
  let basicRate = 0;
  let intermediateRate = 0;
  let higherRate = 0;
  let topRate = 0;

  //How much is in starterRate bracket
  if (salary >= yearRateScottish.starterRate.taxableIncome) {
    starterRate =
      yearRateScottish.starterRate.taxableIncome -
      yearRateScottish.personalAllowance;
  } else if (
    salary < yearRateScottish.starterRate.taxableIncome &&
    salary > yearRateScottish.personalAllowance
  ) {
    starterRate = salary - yearRateScottish.personalAllowance;
  }
  //How much is in basicRate bracket
  if (salary >= yearRateScottish.basicRate.taxableIncome) {
    basicRate =
      yearRateScottish.basicRate.taxableIncome -
      yearRateScottish.starterRate.taxableIncome;
  } else if (
    salary < yearRateScottish.basicRate.taxableIncome &&
    salary > yearRateScottish.starterRate.taxableIncome
  ) {
    basicRate = salary - yearRateScottish.starterRate.taxableIncome;
  }

  //How much is in intermediateRate bracket
  if (salary >= yearRateScottish.intermediateRate.taxableIncome) {
    intermediateRate =
      yearRateScottish.intermediateRate.taxableIncome -
      yearRateScottish.basicRate.taxableIncome;
  } else if (
    salary < yearRateScottish.intermediateRate.taxableIncome &&
    salary > yearRateScottish.basicRate.taxableIncome
  ) {
    intermediateRate = salary - yearRateScottish.basicRate.taxableIncome;
  }

  //How much is in higherRate bracket
  if (salary >= yearRateScottish.higherRate.taxableIncome) {
    higherRate =
      yearRateScottish.higherRate.taxableIncome -
      yearRateScottish.intermediateRate.taxableIncome;
  } else if (
    salary < yearRateScottish.higherRate.taxableIncome &&
    salary > yearRateScottish.intermediateRate.taxableIncome
  ) {
    higherRate = salary - yearRateScottish.intermediateRate.taxableIncome;
  }
  // PA
  if (
    salary >=
    yearRate.incomeLimitPersonalAllowence + yearRate.personalAllowance * 2
  ) {
    console.log(yearRateScottish.personalAllowance);
    higherRate += yearRateScottish.personalAllowance;
  } else if (
    salary <
      yearRate.incomeLimitPersonalAllowence + yearRate.personalAllowance * 2 &&
    salary > yearRate.incomeLimitPersonalAllowence + 1
  ) {
    higherRate += Math.floor(
      (salary - yearRate.incomeLimitPersonalAllowence) / 2
    );
  }

  //How much is in topRate bracket
  if (salary > yearRateScottish.topRate.taxableIncome) {
    topRate = salary - yearRateScottish.topRate.taxableIncome;
  }

  return {
    // totalTaxable: totalTaxable,
    starterRate: starterRate * yearRateScottish.starterRate.taxRate,
    basicRate: basicRate * yearRateScottish.basicRate.taxRate,
    intermediateRate,
    higherRate,
    topRate,
  };
};
const getEnglandIncomeTax = ({ salary, year }) => {
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
    salary - adjustedPersonalAllowence < 0
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
