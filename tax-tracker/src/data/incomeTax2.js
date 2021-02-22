import yearlyRate from "./yearlyRates.json";

export const generateIncomeTax2 = ({ salary, year }) => {
    const yearRate = filterByYear(yearlyRate, year);

    const noPersonalAllowenceSalary =  yearRate.incomeLimitPersonalAllowence + (yearRate.personalAllowance * 2)

    const adjustedPersonalAllowence = 
        (salary < yearRate.incomeLimitPersonalAllowence ? yearRate.personalAllowance
            : (salary >= noPersonalAllowenceSalary ? 0 : 
                yearRate.personalAllowance - (Math.floor((salary - yearRate.incomeLimitPersonalAllowence) / 2))));

    const band1 = (salary >= yearRate.band1 + yearRate.personalAllowance) ? yearRate.band1 : salary - adjustedPersonalAllowence

    const band2 = (salary - adjustedPersonalAllowence - yearRate.band1)
       
    const band3 = (salary >= yearRate.band3 ? salary - yearRate.band2 : 0)

    const taxBracket1 = band1 * 0.2
    const taxBracket2 = band2 * 0.4
    const taxBracket3 = band3 * 0.45

    const totalIncomeTax = taxBracket1 + taxBracket2 + taxBracket3;
    const takeHome = salary - totalIncomeTax;

    return {
        totalTaxable: {
          yearly: (salary - adjustedPersonalAllowence),
          monthly: (salary - adjustedPersonalAllowence) / 12,
          weekly: (salary - adjustedPersonalAllowence) / 52,
        },
        taxBand1: {
          yearly: taxBracket1,
          monthly: taxBracket1 / 12,
          weekly: taxBracket1 / 52,
        },
        taxBand2: {
          yearly: taxBracket2,
          monthly: taxBracket2 / 12,
          weekly: taxBracket2 / 52,
        },
        taxBand3: {
          yearly: taxBracket3,
          monthly: taxBracket3 / 12,
          weekly: taxBracket3 / 52,
        },
        total: {
          yearly: takeHome,
          monthly: (takeHome) / 12,
          weekly: (takeHome) / 52,
        },
        allowance: yearRate.personalAllowance - adjustedPersonalAllowence,
      };} 

function filterByYear(data, year) {
    return data.filter(e => e.year.includes(year))[0];
 }