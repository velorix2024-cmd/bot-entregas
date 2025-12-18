const { getSheetsClient } = require("./google");

const SPREADSHEET_ID = "1bERjN9uFSa7GF8KoY7h6npPoGaPjZbNnp8E0CVL2Byg";

async function loadConfig() {
  const sheets = await getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "CONFIG!A2:B100", // lê até 100 linhas sem erro
  });

  const rows = response.data.values || [];

  const config = {};
  rows.forEach(([campo, valor]) => {
    if (campo) config[campo] = valor;
  });

  return config;
}

module.exports = { loadConfig };