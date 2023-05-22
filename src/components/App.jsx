import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { AppContainer, Title, Subtitle } from './App.styled';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? initialState
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isAdded = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isAdded) {
      return alert(`${name} is already in contacts.`);
    }
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    setContacts(prevState => [...prevState, newContact]);
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const changeFilter = evt => {
    setFilter(evt.currentTarget.value.trim());
  };

  const deleteContact = todoId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== todoId)
    );
  };

  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />

      <Subtitle>Contacts</Subtitle>

      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
    </AppContainer>
  );
}
