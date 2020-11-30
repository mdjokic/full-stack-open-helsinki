const Persons = ({ personToShow, handleDelete }) => {
  return (
    <div>
      {personToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={handleDelete(person.name, person.id)} type='button'>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
