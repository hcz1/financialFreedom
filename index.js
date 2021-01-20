const { generateIncomeTax } = require('./incomeTax.js');
const { nationalInsurance } = require('./nationalInsurance.js');
const { studentLoan } = require('./studentLoan.js');
const PENSION_PERCENTAGE = 0.06;
const SALARY = 60_000;
const adjustedSalary = SALARY * (1 - PENSION_PERCENTAGE);
console.log({
  grossSalary: {
    yearly: SALARY.toFixed(2),
    monthly: (SALARY / 12).toFixed(2),
    weekly: (SALARY / 52).toFixed(2),
  },
  pensionPercentace: PENSION_PERCENTAGE,
  adjustedSalary: {
    yearly: adjustedSalary.toFixed(2),
    monthly: (adjustedSalary / 12).toFixed(2),
    weekly: (adjustedSalary / 52).toFixed(2),
  },
  incomeTax: generateIncomeTax({ salary: adjustedSalary }),
  nationalInsurance: nationalInsurance({ salary: SALARY }),
  pension: {
    yearly: (SALARY * PENSION_PERCENTAGE).toFixed(2),
    monthly: ((SALARY * PENSION_PERCENTAGE) / 12).toFixed(2),
    weekly: ((SALARY * PENSION_PERCENTAGE) / 52).toFixed(2),
  },
  studentLoanPayments: studentLoan({ salary: SALARY }),
});
