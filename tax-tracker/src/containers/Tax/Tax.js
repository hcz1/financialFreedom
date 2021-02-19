import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import Form from '../Form';
import Table from '../Table';
import s from './style.module.scss';

const Tax = ({ className, salary, studentLoan, pension }) => {
  const history = useHistory();
  const [options, setOptions] = useState({
    grossSalary: salary,
    studentLoan,
    pension,
  });
  const onSubmit = useCallback(
    (values) => {
      console.log(values);
      setOptions((prev) => ({ ...prev, ...values }));
      const params = new URLSearchParams({
        salary: values.grossSalary,
        studentLoan: values.studentLoan,
        pension: values.pension,
      });
      history.push({ search: params.toString() });
    },
    [history]
  );
  return (
    <div className={classnames(s.tax, className)}>
      <Form
        className={s.form}
        grossSalary={salary}
        pension={pension}
        studentLoan={studentLoan}
        onSubmit={onSubmit}
      />
      <Table
        className={s.table}
        value={parseInt(options.grossSalary)}
        studentLoanType={options.studentLoan}
        pensionValue={options.pension}
      />
    </div>
  );
};

export default Tax;
