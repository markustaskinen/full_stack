import React from 'react';
import Contact from './Contact';

const ContactList = ({ persons, show, onClick }) => {
    const showContacts = (show === '')
    ? persons
    : persons.filter(person =>
        person.name.toUpperCase().includes(show.toUpperCase()))
        
    return (
      <ul className='contacts'>
        {showContacts.map((person, i) =>
          <Contact key={person.name} person={person} onClick={onClick} />
        )}
      </ul>
    )
  }

  export default ContactList;