const { generateIncomeTax } = require('./incomeTax.js');
const { nationalInsurance } = require('./nationalInsurance.js');
const { studentLoan } = require('./studentLoan.js');
const { generateIncomeTaxAndy } = require('./incomeTaxAndy.js');

const PENSION_PERCENTAGE = 0.06;
const SALARY = 60_000;
const adjustedSalary = SALARY * (1 - PENSION_PERCENTAGE);
console.log({
  andySal: generateIncomeTaxAndy({salary: 75000}),

  grossSalary: SALARY,
  pensionPercentace: PENSION_PERCENTAGE,
  adjustedSalary,
  incomeTax: generateIncomeTax({ salary: adjustedSalary }),
  nationalInsurance: nationalInsurance({ salary: SALARY }),
  yearlyPension: SALARY * PENSION_PERCENTAGE,
  studentLoanPayments: studentLoan({ salary: SALARY }),
});
