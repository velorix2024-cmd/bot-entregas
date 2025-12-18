console.log("✅ google.js carregado de:", __filename);
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

async function getSheetsClient() {
  const filePath = path.join(__dirname, "google-credentials.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const credentials = JSON.parse(raw);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  console.log("✅ Google Sheets conectado com sucesso");
  return sheets;
}

module.exports = { getSheetsClient };