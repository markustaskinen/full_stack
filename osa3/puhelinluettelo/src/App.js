import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [show, setShow] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const names = persons.map(person => person.name.toUpperCase())

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleShowChange = (event) => setShow(event.target.value)

  const showStatus = (message) => {
    setStatusMessage(message)
    setTimeout(() => {
      setStatusMessage(null)
    }, 4000)
  }

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    const duplicate = (persons.length > 0)
      ? names.includes(newName.toUpperCase())
      : false

    if (duplicate) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        const updateIndex = names.indexOf(newName.toUpperCase())
        const updateId = persons.find(person => person.name.toUpperCase() === newName.toUpperCase()).id
        const updated = persons
        personService
          .update(updateId, contactObject)
          .then(returnedPerson => {
            updated.splice(updateIndex, 1, contactObject)
            setPersons(updated)
            showStatus(
              `The number of ${newName} has been replaced.`
            )
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showStatus(
              `Information of ${newName} has already been removed from the server.`
            )
            console.log(error.response.data)
            setPersons(persons.filter(person => person.id !== updateId))
          })
      }
    }
    else {
      personService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showStatus(
            `${newName} added to phonebook.`
          )
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          showStatus(error.response.data.error)
        })
    }
  }

  const removeContact = (id) => {
    const toRemove = persons.find(person => person.id === id).name

    if (window.confirm(`Are you sure you want to remove ${toRemove}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showStatus(
            `${toRemove} removed from phonebook.`
          )
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={statusMessage} />
      <ContactForm
        onSubmit={addContact}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <Filter inputValue={show} showChange={handleShowChange} />
      <ContactList persons={persons} show={show} onClick={removeContact} />
    </div>
  )

}

export default App;
