// src/components/ComposeMessage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import contactsData from '../data/contacts.json';
import { sendSms } from '../services/api'; // Import the API service

function ComposeMessage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Find contact
    try {
      const foundContact = contactsData.find((c) => c.id === parseInt(id));
      if (foundContact) {
        setContact(foundContact);
        // Generate 6-digit OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(generatedOtp);
        setMessage(`Hi. Your OTP is: ${generatedOtp}`);
      } else {
        setError('Contact not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load contact details');
      setLoading(false);
    }
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }
    
    setSending(true);
    setError(null);

    try {
      // Call the API service to send the SMS
      const response = await sendSms(contact.phone, message);
      
      // Save message to history
      const messageHistory = JSON.parse(localStorage.getItem('messageHistory') || '[]');
      messageHistory.push({
        id: Date.now(),
        contactId: contact.id,
        contactName: `${contact.firstName} ${contact.lastName}`,
        phone: contact.phone,
        message,
        otp,
        timestamp: new Date().toISOString(),
        status: response.data?.status || 'sent'
      });
      localStorage.setItem('messageHistory', JSON.stringify(messageHistory));
      
      // Navigate to message history
      navigate('/messages');
    } catch (err) {
      setError(`Failed to send message: ${err.message || 'Please try again.'}`);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!contact) return <div className="error">Contact not found</div>;

  return (
    <div className="compose-message-container">
      <h2>Send Message to {contact.firstName} {contact.lastName}</h2>
      <form onSubmit={handleSendMessage}>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            rows={5}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ComposeMessage;