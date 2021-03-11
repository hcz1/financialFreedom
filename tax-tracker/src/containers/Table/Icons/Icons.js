import yearlyRates from '../../../data/staticData/yearlyRates.json';
import { formatNumber } from '../../../helpers/helpers';
export const icons = ({ taxYear, country }) => {
  const taxRates = yearlyRates[taxYear][country].taxRates;
  return [
    {
      col: 'Adjusted Wage',
      PopperContent: () => (
        <div>
          <p style={{ marginBottom: '12px' }}>
            <b>Adjusted wage</b> is your salary minus the amount you pay into
            your pension
          </p>
          <p>The adjusted wage is what your tax is based on</p>
        </div>
      ),
    },
    ...taxRates.map((item, i) =>
      i === 0
        ? {}
        : {
            col: item.name,
            PopperContent: () => {
              return i !== taxRates.length - 1 ? (
                <div>
                  <p>
                    The tax year of <b>{taxYear}</b> {item.name} tax is taxed
                    from <b>£{formatNumber(taxRates[i - 1].taxableIncome)}</b>{' '}
                    to <b>£{formatNumber(item.taxableIncome)} </b> at a rate of
                    <b> {item.rate * 100}%</b>
                    <br />
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    The tax year of <b>{taxYear}</b> higher rate tax is taxed at{' '}
                    <b>£{formatNumber(item.taxableIncome)}+</b> at a rate of
                    <b> 45%</b>
                  </p>
                </div>
              );
            },
          }
    ),
  ];
};
