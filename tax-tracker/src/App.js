import { useState } from 'react';
import { formatNumber } from './helpers/helpers';
import Form from './containers/Form';
import s from './App.module.css';
import Table from './containers/Table/TableContainer';

const App = () => {
  const [value, setValue] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(false);
  const onEnter = (e) => {
    e.preventDefault();
    setHasSubmit(true);
  };
  const handleChange = (e) => {
    setHasSubmit(false);
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  return (
    <div className={s.app}>
      <h1>Fill in your yearly salary</h1>
      <Form onEnter={onEnter} handleChange={handleChange} value={value} />
      {hasSubmit && <h2>{`Salary submitted: £${formatNumber(value)}`}</h2>}
      {hasSubmit && <Table className={s['table-container']} value={value} />}
    </div>
  );
};

export default App;
