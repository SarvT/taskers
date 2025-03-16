import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contactsData from '../data/contacts.json';

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API fetch with local JSON data
    try {
      setContacts(contactsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load contacts');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="loading">Loading contacts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="contacts-list-container">
      <h2>Contacts</h2>
      <ul className="contacts-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <Link to={`/contact/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactsList;