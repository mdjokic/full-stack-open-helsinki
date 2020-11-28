import { useState } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';

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
      <Filter predicate={predicate} handlePredicateChange={handlePredicateChange} />
      <h2>add a new</h2>
      <PersonForm
        newPerson={newPerson}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  );
};

export default App;
