import React from 'react';

const Contact = ({ person, onClick }) => {
    return (
      <li className='contact'>
        {person.name} {person.number}
        <button onClick={() => onClick(person.id)}>
          remove
        </button>
      </li>
    )
  }

  export default Contact;