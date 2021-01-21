export const generateIncomeTax = ({ salary }) => {
  const SALARY = salary;
  const TAX_FREE_ALLOWANCE = 12_500;
  const IS_SALARY_OVER_100K = SALARY > 100_000;

  // personal allowance deduction check
  let amountOffPersonalAllowance = 0;
  if (IS_SALARY_OVER_100K && SALARY <= 125_000) {
    amountOffPersonalAllowance = Math.floor((SALARY - 100_000) / 2);
  } else if (SALARY > 125_000) {
    amountOffPersonalAllowance = TAX_FREE_ALLOWANCE;
  }

  const TOTAL_TAXABLE =
    SALARY >= TAX_FREE_ALLOWANCE
      ? SALARY - TAX_FREE_ALLOWANCE + amountOffPersonalAllowance
      : 0;

  // tax band 1 spec
  const BAND_1_THRESHOLD = 50_000;
  const IS_BAND_1 = SALARY > TAX_FREE_ALLOWANCE && SALARY <= BAND_1_THRESHOLD;
  const BAND_1_RATE = 0.2;

  // tax band 2 spec
  const BAND_2_THRESHOLD = 150_000;
  const IS_BAND_2 = SALARY > BAND_1_THRESHOLD && SALARY < BAND_2_THRESHOLD;
  const BAND_2_RATE = 0.4;

  const IS_BAND_3 = SALARY > BAND_2_THRESHOLD;
  const BAND_3_RATE = 0.45;

  let taxBand1 = 0;
  // tax band 1 12_501 to 50_000
  if (IS_BAND_1) {
    taxBand1 = (SALARY - TAX_FREE_ALLOWANCE) * BAND_1_RATE;
  } else if (SALARY >= BAND_1_THRESHOLD) {
    taxBand1 = (BAND_1_THRESHOLD - TAX_FREE_ALLOWANCE) * BAND_1_RATE;
  }

  // tax band 2 50_001 to 150_000
  let taxBand2 = 0;
  if (IS_BAND_2) {
    taxBand2 =
      (SALARY - BAND_1_THRESHOLD + amountOffPersonalAllowance) * BAND_2_RATE;
  } else if (SALARY >= BAND_2_THRESHOLD) {
    taxBand2 =
      (BAND_2_THRESHOLD - BAND_1_THRESHOLD + amountOffPersonalAllowance) *
      BAND_2_RATE;
  }

  // tax band 3 150_001+
  let taxBand3 = 0;
  if (IS_BAND_3) {
    taxBand3 = (SALARY - BAND_2_THRESHOLD) * BAND_3_RATE;
  }

  return {
    totalTaxable: {
      yearly: TOTAL_TAXABLE.toFixed(2),
      monthly: (TOTAL_TAXABLE / 12).toFixed(2),
      weekly: (TOTAL_TAXABLE / 52).toFixed(2),
    },
    taxBand1: {
      yearly: taxBand1.toFixed(2),
      monthly: (taxBand1 / 12).toFixed(2),
      weekly: (taxBand1 / 52).toFixed(2),
    },
    taxBand2: {
      yearly: taxBand2.toFixed(2),
      monthly: (taxBand2 / 12).toFixed(2),
      weekly: (taxBand2 / 52).toFixed(2),
    },
    taxBand3: {
      yearly: taxBand3.toFixed(2),
      monthly: (taxBand3 / 12).toFixed(2),
      weekly: (taxBand3 / 52).toFixed(2),
    },
    allowance: TAX_FREE_ALLOWANCE - amountOffPersonalAllowance,
  };
};
