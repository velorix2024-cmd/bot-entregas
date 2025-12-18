const bot = require("./bot");

async function webhookHandler(req, res) {
  console.log("📩 Recebido do Z-API:", req.body);

  // ✅ Captura o número do telefone
  let phone =
    req.body.phone ||
    req.body.from ||
    req.body.sender ||
    req.body.remoteJid ||
    null;

  // ✅ Padroniza o número para o formato aceito pela Z-API
  if (phone) {
    phone = phone.toString().replace(/\D/g, ""); // remove tudo que não é número

    if (!phone.startsWith("55")) {
      phone = "55" + phone;
    }
  }

  // ✅ Captura texto corretamente do Z-API
  const message =
    req.body.text?.message ||
    req.body.message ||
    req.body.body ||
    req.body.text ||
    req.body.messageData?.text ||
    req.body.content ||
    req.body.photo ||
    req.body.image ||
    req.body.mediaUrl ||
    null;

  console.log("📨 Mensagem interpretada:", message);
  console.log("📞 Número padronizado:", phone);

  if (!message || !phone) {
    console.log("❌ Formato inválido recebido:", req.body);
    return res.sendStatus(200);
  }

  try {
    await bot.handleMessage(phone, message);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao processar mensagem:", error.message);
    res.sendStatus(500);
  }
}

module.exports = { webhookHandler };