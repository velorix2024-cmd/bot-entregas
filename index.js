const express = require('express');
const bodyParser = require('body-parser');
const { webhookHandler } = require("./webhook");

// ✅ NÃO importe o bot aqui — o webhook já chama ele
// const bot = require('./bot');  ❌ REMOVER

const app = express();
app.use(bodyParser.json());

// ✅ Webhook do WhatsApp (Z-API)
app.post('/webhook', webhookHandler);

// ✅ Webhook da Machine
app.post('/machine-webhook', webhookHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});