// src/services/api.js
/**
 * API Service for making HTTP requests to the backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log(import.meta.env.VITE_API_URL);

/**
 * Send SMS message via backend API
 * @param {string} phoneNumber - Recipient phone number in E.164 format
 * @param {string} message - Message content
 * @returns {Promise} - Response from API
 */
export const sendSms = async (phoneNumber, message) => {
  try {
    const response = await fetch(`${API_URL}/send-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send SMS');
    }

    return data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

/**
 * Check if backend is available
 * @returns {Promise<boolean>} - True if backend is available
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};