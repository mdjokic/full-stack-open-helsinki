import { useState, useEffect } from 'react';
import Persons from './Components/Persons';
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import Notification from './Components/Notification';
import PersonService from './Services/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [predicate, setPredicate] = useState('');
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    PersonService.getAll().then((data) => setPersons(data));
  }, []);

  //Notification messages
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const notificationDuration = 5000;

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
        showNotification('success', `Added ${data.name}`);
      });
    } else {
      if (window.confirm(`${newPerson.name} is already aded to phonebook, replace old number with a new one?`)) {
        PersonService.update(duplicate[0].id, newPerson).then((data) => {
          setPersons(persons.map((person) => (person.id !== duplicate[0].id ? person : data)));
          showNotification('success', `Updated ${data.name}`);
        })
        .catch((_) => {
          showNotification('error', `${duplicate[0].name} has been deleted from server`);
          setPersons(persons.filter((person) => person.id !== duplicate[0].id));
        });
        setNewPerson({ name: '', number: '' });
      }
    }
  };

  const showNotification = (type, message) => {
    if (type === 'error') {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, notificationDuration);
    } else {
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage(null);
      }, notificationDuration);
    }
  };

  const handleDelete = (name, id) => () => {
    if (window.confirm(`Do you realy want to delete ${name}`)) {
      PersonService.remove(id)
        .then((_) => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification('success', `${name} has been successfully removed from server`);
        })
        .catch((_) => {
          showNotification('error', `${name} has already been deleted from server`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      <Filter predicate={predicate} handlePredicateChange={handlePredicateChange} />
      <h2>add a new</h2>
      <PersonForm
        newPerson={newPerson}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} personToShow={personToShow} />
    </div>
  );
};

export default App;
