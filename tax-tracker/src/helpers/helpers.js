export const formatNumber = (num) => {
  return typeof num === 'number'
    ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    : num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};
const shortenYear = (YYYY) => {
  return YYYY.toString().substring(2, 4);
};
export const generateTaxYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const TAX_YEAR_START_DATE = new Date().setFullYear(year, MONTHS.Apr, 6);
  const thisYY = shortenYear(year);
  if (now.getMonth() >= MONTHS.Apr && now >= TAX_YEAR_START_DATE) {
    const nextYY = shortenYear(year + 1);
    return `${thisYY}/${nextYY}`;
  } else {
    const lastYY = shortenYear(year - 1);
    return `${lastYY}/${thisYY}`;
  }
};
