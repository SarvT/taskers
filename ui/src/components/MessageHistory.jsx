import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MessageHistory() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get messages from localStorage
    const messageHistory = JSON.parse(localStorage.getItem('messageHistory') || '[]');
    // Sort by date in descending order
    messageHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setMessages(messageHistory);
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="message-history-container">
      <h2>Message History</h2>
      {messages.length === 0 ? (
        <p>No messages sent yet.</p>
      ) : (
        <ul className="message-list">
          {messages.map((msg) => (
            <li key={msg.id} className="message-item">
              <div className="message-header">
                <span className="contact-name">{msg.contactName}</span>
                <span className="message-time">{formatDate(msg.timestamp)}</span>
              </div>
              <div className="message-content">
                <div className="message-body">{msg.message}</div>
                <div className="message-otp">OTP: {msg.otp}</div>
              </div>
              <div className="message-phone">Phone: {msg.phone}</div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/" className="btn btn-secondary">Back to Contacts</Link>
    </div>
  );
}

export default MessageHistory;