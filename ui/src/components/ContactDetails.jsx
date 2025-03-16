import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import contactsData from '../data/contacts.json';

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API fetch with local JSON data
    try {
      const foundContact = contactsData.find((c) => c.id === parseInt(id));
      if (foundContact) {
        setContact(foundContact);
      } else {
        setError('Contact not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load contact details');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="loading">Loading contact details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!contact) return <div className="error">Contact not found</div>;

  return (
    <div className="contact-details-container">
      <h2>Contact Details</h2>
      <div className="contact-info">
        <p><strong>Name:</strong> {contact.firstName} {contact.lastName}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>
      </div>
      <Link to={`/compose/${contact.id}`} className="btn btn-primary">
        Send Message
      </Link>
      <Link to="/" className="btn btn-secondary">
        Back to Contacts
      </Link>
    </div>
  );
}

export default ContactDetails;