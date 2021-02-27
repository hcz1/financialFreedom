import nationalInsuranceRate from './staticData/nationalInsuranceRates.json';

export const nationalInsurance = ({ salary, year }) => {
  const niRates = nationalInsuranceRate[year];
  let niTotal = 0;

  if ( salary <= niRates.threshold1) return niTotal;

  if ( salary <= niRates.threshold2 ){
    niTotal = (salary - niRates.threshold1) * niRates.rate1;
    return niTotal;
  }

  niTotal = (niRates.threshold2 - niRates.threshold1) * niRates.rate1;
  niTotal += (salary - niRates.threshold2) * niRates.rate2;

  return niTotal;
  
};