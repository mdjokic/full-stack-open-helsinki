import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [predicate, setPredicate] = useState('');
  const [showAll, setShowAll] = useState(true);

  const personToShow = showAll ? persons : persons.filter((person) => person.name.toLowerCase().includes(predicate));

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewPerson({ ...newPerson, name: newName });
  };

  const handleNumberChange = (event) => {
    const newNumber = event.target.value;
    setNewPerson({ ...newPerson, number: newNumber });
  };

  const handlePredicateChange = (event) => {
    const newPredicate = event.target.value.toLowerCase();
    if (newPredicate.length === 0) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
    setPredicate(newPredicate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicate = persons.filter((person) => person.name === newPerson.name);
    if (duplicate.length === 0) {
      setPersons(persons.concat(newPerson));
      setNewPerson({ name: '', number: '' });
    } else {
      window.alert(`${newPerson.name} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={predicate} onChange={handlePredicateChange} />
      </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {personToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
