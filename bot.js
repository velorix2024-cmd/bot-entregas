const { sendMessage } = require("./zapi");
const { obterCotacao, criarSolicitacao } = require("./machine");
const { buscarClientePorTelefone } = require("./clientes");

let userState = {};

async function handleMessage(phone, message) {
  if (!message) {
    await sendMessage(phone, "❌ Não consegui entender sua mensagem.");
    return;
  }

  message = message.toString().trim();

  if (!userState[phone]) {
    userState[phone] = { etapa: "inicio" };
  }

  const state = userState[phone];

  if (state.etapa === "inicio") {
    const cliente = await buscarClientePorTelefone(phone);

    if (!cliente) {
      await sendMessage(phone, "❌ Seu número não está cadastrado. Fale com o suporte.");
      delete userState[phone];
      return;
    }

    state.cliente = cliente;

    await sendMessage(
      phone,
      `Olá, *${cliente.nome}*! Vamos iniciar sua entrega.\n\n` +
      `📍 Onde deseja que o entregador retire o pacote?\n\n` +
      `1️⃣ Usar meu endereço cadastrado:\n${cliente.endereco}\n\n` +
      `2️⃣ Informar outro endereço`
    );

    state.etapa = "escolher_retirada";
    return;
  }

  if (state.etapa === "escolher_retirada") {
    if (message === "1") {
      state.retirada = state.cliente.endereco;
      await sendMessage(phone, "✅ Endereço de retirada definido!\n\nAgora informe o 📍 *endereço de destino:*");
      state.etapa = "destino";
      return;
    }

    if (message === "2") {
      await sendMessage(phone, "Digite o 📍 *endereço de retirada:*");
      state.etapa = "retirada_manual";
      return;
    }

    await sendMessage(phone, "❌ Opção inválida. Digite 1 ou 2.");
    return;
  }

  if (state.etapa === "retirada_manual") {
    state.retirada = message;
    await sendMessage(phone, "✅ Endereço de retirada salvo!\n\nAgora informe o 📍 *endereço de destino:*");
    state.etapa = "destino";
    return;
  }

  if (state.etapa === "destino") {
    state.destino = message;

    const cotacao = await obterCotacao(state.retirada, state.destino);

    if (!cotacao || !cotacao.valor) {
      await sendMessage(phone, "❌ Não consegui calcular o valor. Tente novamente.");
      delete userState[phone];
      return;
    }

    state.valor = cotacao.valor;

    await sendMessage(
      phone,
      `✅ Cotação encontrada!\n\n` +
      `📦 *De:* ${state.retirada}\n` +
      `➡️ *Para:* ${state.destino}\n\n` +
      `💰 *Valor estimado:* R$ ${cotacao.valor}\n` +
      `📏 Distância: ${cotacao.distancia} km\n` +
      `⏱ Tempo estimado: ${cotacao.tempo} min\n\n` +
      `Deseja confirmar a solicitação?\n✅ SIM\n❌ NÃO`
    );

    state.etapa = "confirmar";
    return;
  }

  if (state.etapa === "confirmar") {
    if (message.toLowerCase() !== "sim") {
      await sendMessage(phone, "✅ Solicitação cancelada. Se precisar, é só chamar!");
      delete userState[phone];
      return;
    }

    const solicitacao = await criarSolicitacao(
      state.retirada,
      state.destino,
      state.cliente.telefone
    );

    if (!solicitacao || !solicitacao.solicitacao_id) {
      await sendMessage(phone, "❌ Erro ao criar solicitação. Tente novamente.");
      delete userState[phone];
      return;
    }

    await sendMessage(
      phone,
      `✅ Solicitação criada com sucesso!\n\n` +
      `📦 *ID:* ${solicitacao.solicitacao_id}\n` +
      `🔗 *Acompanhe aqui:* ${solicitacao.link_acompanhamento}\n\n` +
      `Aguarde enquanto encontramos um entregador.`
    );

    delete userState[phone];
    return;
  }
}

module.exports = { handleMessage };