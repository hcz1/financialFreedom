export const nationalInsurance = ({ salary }) => {
  const monthlySalary = salary / 12;
  const NI_BAND_1 = 0.12;
  const NI_BAND_2 = 0.02;
  let niRate = 0;
  if (monthlySalary >= 792 && monthlySalary <= 4167) {
    niRate = Math.round((monthlySalary - 792) * NI_BAND_1);
  }
  if (monthlySalary > 4167) {
    niRate +=
      (4167 - 792) * NI_BAND_1 + Math.round((monthlySalary - 4167) * NI_BAND_2);
  }
  return {
    yearly: (niRate * 12).toFixed(2),
    monthly: niRate.toFixed(2),
    weekly: ((niRate * 12) / 52).toFixed(2),
  };
};
// £183 to £962 a week (£792 to £4,167 a month)	12%
// Over £962 a week (£4,167 a month)	2%
