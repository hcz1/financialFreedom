const generateIncomeTaxAndy = ({ salary }) => {

    const band1 = (salary >= 50000 ? 50000 : salary ) 
    const band2 = (salary >= 150000 ? 100000 : (salary >= 50000 ? salary - 50000 : 0))
    const band3 = (salary >= 150000 ? salary - 150000 : 0)

    const personalAllowance = (salary < 100000 ? 12500 : (salary >= 125000 ? 0 : 12500 - Math.floor((salary - 100000) / 2)))

    const taxBracket1 = (band1 - personalAllowance) * 0.2
    const taxBracket2 = band2 * 0.4
    const taxBracket3 = band3 * 0.5

    const totalIncomeTax = taxBracket1 + taxBracket2 + taxBracket3;

    return {
        salary,
        personalAllowance,
        totalIncomeTax
    };
}

module.exports = {
    generateIncomeTaxAndy,
};
  