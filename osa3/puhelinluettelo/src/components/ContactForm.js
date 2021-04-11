import React from 'react';

const ContactForm = (props) => {
    return (
      <>
        <h2>Add new contact</h2>
        <form onSubmit={props.onSubmit} className='contactForm'>
        <div>
          name:
          <input
            value={props.name}
            onChange={props.nameChange}
          />
        </div>
        <div>
          number:
          <input
            value={props.number}
            onChange={props.numberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
    )
  }

  export default ContactForm;