import React, { useState, useEffect } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppWrap } from './App.styled';

const STORAGE_KEY = 'contacts';
const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContaxts] = useState(INITIAL_CONTACTS);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const firstRenderContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (firstRenderContacts) {
      setContaxts(firstRenderContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts === INITIAL_CONTACTS) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = ({ value }) => {
    setFilter(value);
  };

  const handleSubmit = newContact => {
    checkNewContact(newContact)
      ? alert(`${newContact.name} is already in contacts`)
      : addNewContact(newContact);
  };

  const checkNewContact = newContact => {
    let isNameNew = false;
    contacts.map(contact =>
      contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
        ? (isNameNew = true)
        : isNameNew
    );
    return isNameNew;
  };

  const addNewContact = newContact => {
    setContaxts([...contacts, newContact]);
  };

  const handleFilter = () => {
    const filterValue = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filterValue)
    );
    return filteredContacts;
  };

  const deleteContact = contactId => {
    setContaxts(contacts.filter(contact => contact.id !== contactId));
  };

  const filteredContacts = handleFilter();
  return (
    <AppWrap>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} onChange={handleChange} />
      <ContactList
        storageKey={STORAGE_KEY}
        contacts={filteredContacts}
        onDelete={deleteContact}
      />
    </AppWrap>
  );
};
