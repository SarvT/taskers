const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);


const sendSms = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: "Phone number and message are required",
      });
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    console.log(twilioPhone);

    if (!phoneRegex.test(to)) {
      return res.status(400).json({
        success: false,
        error:
          "Invalid phone number format. Use E.164 format (e.g., +919810153260)",
      });
    }

    const messageSent = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: to,
    });

    console.log("Message sent with SID:", messageSent.sid);

    return res.status(200).json({
      success: true,
      data: {
        sid: messageSent.sid,
        status: messageSent.status,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);

    if (error.code) {
      return res.status(400).json({
        success: false,
        error: `Twilio Error ${error.code}: ${error.message}`,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to send message",
    });
  }
};

const health = (req, res) => {
  res.status(200).json({ status: "ok" });
};

module.exports = { health, sendSms };
