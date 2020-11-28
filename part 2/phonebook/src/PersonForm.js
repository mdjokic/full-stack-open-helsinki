const PersonForm = ({ newPerson, handleSubmit, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newPerson.name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPerson.number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
