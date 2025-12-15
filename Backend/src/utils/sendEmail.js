const axios = require('axios');

const sendEmail = async (email, subject, text) => {
  try {
    const data = {
      sender: {
        name: "Ulfat-e-Odhani",
        email: process.env.EMAIL_USER // Must be your verified Brevo sender
      },
      to: [
        { email: email }
      ],
      subject: subject,
      htmlContent: `<p>${text}</p>` // Brevo API requires HTML content
    };

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      data,
      {
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY, // Use the API Key here
          'content-type': 'application/json'
        }
      }
    );

    console.log("Email sent successfully via API:", response.status);
  } catch (error) {
    console.error("API Email Error:", error.response ? error.response.data : error.message);
  }
};

module.exports = sendEmail;