const Form = ({ onEnter, onChange, handleChange, value }) => {
  return (
    <form onSubmit={onEnter}>
      £<input type='number' onChange={handleChange} value={value} />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
