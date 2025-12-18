const axios = require("axios");

// ✅ Agora as credenciais vêm das variáveis de ambiente do Railway
const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;

async function sendMessage(phone, message) {
  try {
    await axios.post(
      `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
      {
        phone: phone,
        message: message
      }
    );
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response?.data || error.message
    );
  }
}

module.exports = { sendMessage };