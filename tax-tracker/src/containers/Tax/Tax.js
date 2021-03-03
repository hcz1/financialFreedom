import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import Form from '../Form';
import Table from '../Table';
import s from './style.module.scss';
import { generateTaxYear } from '../../helpers/helpers';
import Description from '../../components/Description';

const Tax = ({
  className,
  salary,
  studentLoan = 'none',
  pension,
  multiplier = '1',
}) => {
  const history = useHistory();
  const [options, setOptions] = useState({
    grossSalary: salary,
    studentLoan,
    pension,
    multiplier: multiplier,
    taxYear: generateTaxYear(),
  });
  const onSubmit = useCallback(
    (values) => {
      setOptions((prev) => ({ ...prev, ...values }));
      const params = new URLSearchParams({
        salary: values.grossSalary,
        studentLoan: values.studentLoan,
        pension: values.pension,
        multiplier: values.multiplier,
      });
      history.push({ search: params.toString() });
    },
    [history]
  );
  return (
    <div className={classnames(s.tax, className)}>
      <Form
        className={s.form}
        grossSalary={options.grossSalary}
        pension={options.pension}
        studentLoan={options.studentLoan}
        multiplier={options.multiplier}
        taxYear={options.taxYear}
        onSubmit={onSubmit}
      />
      <Description className={s.description} />
      <Table
        className={s.table}
        value={parseFloat(options.grossSalary)}
        studentLoanType={options.studentLoan}
        pensionValue={options.pension}
        multiplier={options.multiplier}
        taxYear={options.taxYear}
      />
    </div>
  );
};

export default Tax;
