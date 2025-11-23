import { useState } from 'react';
import './App.css';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '123-456-7890' }]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const validate = (personObject) => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if (personObject.name.trim().length === 0) {
      alert('Add a valid name');
      return false;
    }

    if (persons.some(person => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`);
      return false;
    }

    if (!phonePattern.test(personObject.phone)) {
      alert('Please enter a valid phone number in the format XXX-XXX-XXXX');
      return false;
    }

    return true;
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = { name: newName, phone: newPhone };
    if (!validate(personObject)) return;

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()) ||
    person.phone.includes(filter)
  );

  return (
    <div className="container">
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm 
        name={newName}
        phone={newPhone}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        onSubmit={addPerson}
      />

      <h3>Numbers</h3>
      <ul>
        <Persons persons={filteredPersons} />
      </ul>
    </div>
  );
};

export default App;
