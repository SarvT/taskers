// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ContactsList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import ComposeMessage from './components/ComposeMessage';
import MessageHistory from './components/MessageHistory';
import { checkBackendHealth } from './services/api';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const isHealthy = await checkBackendHealth();
        setBackendStatus(isHealthy ? 'online' : 'offline');
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    checkBackend();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Contacts App</h1>
          <nav>
            <ul className="nav-menu">
              <li>
                <Link to="/">Contacts</Link>
              </li>
              <li>
                <Link to="/messages">Message History</Link>
              </li>
            </ul>
          </nav>
          {backendStatus === 'offline' && (
            <div className="backend-status-warning">
              Warning: Backend service is offline. SMS functionality may not work.
            </div>
          )}
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<ContactsList />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="/compose/:id" element={<ComposeMessage />} />
            <Route path="/messages" element={<MessageHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;