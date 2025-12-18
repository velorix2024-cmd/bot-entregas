const axios = require("axios");

axios.post(
  "https://cloud.taximachine.com.br/api/integracao/abrirSolicitacao",
  {
    empresa_id: 4409,
    passageiro: "Janderson",
    telefone: "98999999999",

    partida: {
      latitude: -2.59,
      longitude: -44.18,
      endereco: "Rua Projetada, 123",
      numero: "123",
      bairro: "Centro",
      cidade: "São Luís",
      uf: "MA",
      cep: "65000-000",
      referencia: "Próximo à praça central"
    },

    paradas: [
      {
        latitude: -2.53,
        longitude: -44.20,
        endereco: "Avenida Principal, 456",
        numero: "456",
        bairro: "Cohama",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-001",
        referencia: "Em frente ao supermercado"
      },
      {
        latitude: -2.52,
        longitude: -44.21,
        endereco: "Rua Secundária, 789",
        numero: "789",
        bairro: "Renascença",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-002",
        referencia: "Próximo ao shopping"
      },
      {
        latitude: -2.51,
        longitude: -44.22,
        endereco: "Rua Alfa, 100",
        numero: "100",
        bairro: "Calhau",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-003",
        referencia: "Perto da praia"
      },
      {
        latitude: -2.50,
        longitude: -44.23,
        endereco: "Rua Beta, 200",
        numero: "200",
        bairro: "Ponta d’Areia",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-004",
        referencia: "Próximo ao hotel"
      },
      {
        latitude: -2.49,
        longitude: -44.24,
        endereco: "Rua Gama, 300",
        numero: "300",
        bairro: "Jaracaty",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-005",
        referencia: "Ao lado da praça"
      },
      {
        latitude: -2.48,
        longitude: -44.25,
        endereco: "Rua Delta, 400",
        numero: "400",
        bairro: "São Francisco",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-006",
        referencia: "Próximo à igreja"
      },
      {
        latitude: -2.47,
        longitude: -44.26,
        endereco: "Rua Épsilon, 500",
        numero: "500",
        bairro: "Bequimão",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-007",
        referencia: "Em frente à escola"
      },
      {
        latitude: -2.46,
        longitude: -44.27,
        endereco: "Rua Zeta, 600",
        numero: "600",
        bairro: "Ipase",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-008",
        referencia: "Perto da farmácia"
      },
      {
        latitude: -2.45,
        longitude: -44.28,
        endereco: "Rua Eta, 700",
        numero: "700",
        bairro: "Angelim",
        cidade: "São Luís",
        uf: "MA",
        cep: "65000-009",
        referencia: "Ao lado do posto"
      }
    ],

    forma_pagamento: 1,
    observacao: "Solicitação via WhatsApp"
  },
  {
    headers: {
      "api-key": "mch_api_NRTD0ipl0Wfw43slgsJa5uQ5",
      "Authorization": "Basic dmVsb3JpeC4yMDI0QG91dGxvb2suY29tOkFwaW1hY2hpbmUjMDE="
    }
  }
)
.then(r => {
  console.log("RESPOSTA DA API:");
  console.log(JSON.stringify(r.data, null, 2));
})
.catch(err => {
  console.log("ERRO COMPLETO:");
  console.log(JSON.stringify(err.response?.data || err.message, null, 2));
});
