import React, { Component } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppWrap } from './App.styled';

const STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleChange = ({ name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = newContact => {
    this.checkNewContact(newContact)
      ? alert(`${newContact.name} is already in contacts`)
      : this.addNewContact(newContact);
  };

  checkNewContact = newContact => {
    let isNameNew = false;
    this.state.contacts.forEach(contact =>
      contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
        ? (isNameNew = true)
        : isNameNew
    );
    return isNameNew;
  };

  addNewContact = newContact => {
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  filter = () => {
    const filterValue = this.state.filter.toLocaleLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filterValue)
    );
    return filteredContacts;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.filter();
    return (
      <AppWrap>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter filterValue={this.state.filter} onChange={this.handleChange} />
        <ContactList
          storageKey={STORAGE_KEY}
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </AppWrap>
    );
  }
}
