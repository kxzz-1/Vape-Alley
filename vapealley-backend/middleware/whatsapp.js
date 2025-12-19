const axios = require('axios');

const sendWhatsAppConfirmation = async (order) => {
  const token = process.env.WHAPI_TOKEN;
  if (!token) {
    console.error("WHAPI_TOKEN is missing in environment variables.");
    return;
  }

  // Sanitize phone number: remove non-digit characters
  const phone = order.phone.replace(/\D/g, '');
  const message = `Hi ${order.customer}, thanks for your order #${order._id} of Rs ${order.total.toLocaleString()}. We are processing it now!`;

  try {
    const res = await axios.post('https://gate.whapi.cloud/messages/text', {
      to: phone,
      body: message
    }, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    console.log(`WhatsApp notification sent to ${phone}:`, res.data);
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error.response ? error.response.data : error.message);
  }
};

module.exports = { sendWhatsAppConfirmation };