import { useState, useEffect } from 'react';
import Persons from './Components/Persons';
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import PersonService from './Services/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [predicate, setPredicate] = useState('');
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    PersonService.getAll().then((data) => setPersons(data));
  }, []);

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
      PersonService.save(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewPerson({ name: '', number: '' });
      });
    } else {
      window.alert(`${newPerson.name} is already added to phonebook`);
    }
  };

  const handleDelete = (name, id) => () => {
    if (window.confirm(`Do you realy want to delete ${name}`)) {
      PersonService.remove(id)
        .then((_) => {
          setPersons(persons.filter((person) => person.id !== id));
        });
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
      <Persons 
        handleDelete={handleDelete} 
        personToShow={personToShow} />
    </div>
  );
};

export default App;
