export const formatNumber = (num) => {
  return typeof num === 'number'
    ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    : num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
