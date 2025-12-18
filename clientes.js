const { getSheetsClient } = require("./google");

const SPREADSHEET_ID = "1bERjN9uFSa7GF8KoY7h6npPoGaPjZbNnp8E0CVL2Byg";

// Função para deixar só números
function limparTelefone(tel) {
  return String(tel).replace(/\D/g, ""); // remove tudo que não é número
}

async function buscarClientePorTelefone(telefone) {
  const sheets = await getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "CLIENTES!A2:I1000",
  });

  const rows = response.data.values || [];

  const telLimpo = limparTelefone(telefone);

  const cliente = rows.find(row => {
    const telPlanilha = limparTelefone(row[2] || "");
    return telPlanilha === telLimpo;
  });

  if (!cliente) return null;

  return {
    id: cliente[0],
    nome: cliente[1],
    telefone: cliente[2],
    endereco: cliente[3],
    lat: cliente[4],
    lng: cliente[5],
    saldo: cliente[6],
    dataCadastro: cliente[7],
    status: cliente[8]
  };
}

module.exports = { buscarClientePorTelefone };