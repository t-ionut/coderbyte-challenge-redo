import React, { useState } from 'react';
import './App.css';

function ContactForm({ addNewContact }) {
  const [contact, setContact] = useState({
    userFirstName: "Coder",
    userLastName: "Byte",
    userPhone: "1234"
  });

  const handleContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });
  };

  const handleNewContact = (event) => {
    event.preventDefault();
    addNewContact(contact);
  };

  return (
    <form onSubmit={handleNewContact}>
      <input
	name="userFirstName"
	onChange={handleContactChange}
	value={contact.userFirstName}
      />
      <input
	name="userLastName"
	onChange={handleContactChange}
	value={contact.userLastName}
      />
      <input
        name="userPhone"
	onChange={handleContactChange}
	value={contact.userPhone}
      />
      <input
        type="submit"
      />
    </form>
  );
}

function ContactsTable({ contacts }) {
  const sortedContacts = [...contacts].sort(
    (c1, c2) => {
      if (c1.userLastName.toLowerCase() > c2.userLastName.toLowerCase()) {
        return -1;
      }
      if (c1.userLastName.toLowerCase() > c2.userLastName.toLowerCase()) {
        return 1;
      }
      return 0;
    }
  );

  return (
    <table>
      <thead>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone</th>
      </thead>
      <tbody>{
	sortedContacts.map(({userFirstName, userLastName, userPhone}, idx) => (
          <tr key={`${userFirstName}-${idx}`}>
            <td>{userFirstName}</td>
            <td>{userLastName}</td>
            <td>{userPhone}</td>
          </tr>
	))
      }</tbody>
    </table>
  );
}

function App() {
  const [contacts, setContacts] = useState([]);

  const addNewContact = ({ userFirstName, userLastName, userPhone }) => {
    setContacts([
      ...contacts,
      { userFirstName, userLastName, userPhone }
    ]);
  };

  return (
    <div className="App">
      <ContactForm addNewContact={addNewContact} />
      <ContactsTable contacts={contacts} />
    </div>
  );
}

export default App;
