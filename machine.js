const axios = require("axios");
const { carregarConfig } = require("./config");

// ✅ Cotação da solicitação (estimativa)
async function obterCotacao(origem, destino) {
  try {
    const config = await carregarConfig();

    const payload = {
      empresa_id: config.empresa_id,
      origem_endereco: origem,
      destino_endereco: destino
    };

    const response = await axios.post(
      "https://cloud.taximachine.com.br/api/integracao/estimativa",
      payload,
      {
        headers: {
          "x-api-key": config.api_key,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data?.estimativa || null;

  } catch (error) {
    console.error("Erro ao obter estimativa:", error.response?.data || error.message);
    return null;
  }
}

// ✅ Criar solicitação real
async function criarSolicitacao(origem, destino, telefone) {
  try {
    const config = await carregarConfig();

    const payload = {
      empresa_id: config.empresa_id,
      categoria_id: config.categoria_padrao,
      origem_endereco: origem,
      destino_endereco: destino,
      telefone_cliente: telefone
    };

    const response = await axios.post(
      "https://cloud.taximachine.com.br/api/integracao/abrirSolicitacao",
      payload,
      {
        headers: {
          "x-api-key": config.api_key,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Erro ao criar solicitação:", error.response?.data || error.message);
    return null;
  }
}

module.exports = {
  obterCotacao,
  criarSolicitacao
};