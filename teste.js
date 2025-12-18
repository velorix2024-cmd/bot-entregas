const { loadConfig } = require("./config");
const { buscarClientePorTelefone } = require("./clientes");

(async () => {
  console.log("🔄 Lendo CONFIG...");
  const config = await loadConfig();
  console.log("✅ CONFIG carregada:");
  console.log(config);

  console.log("\n🔄 Buscando cliente...");
  const cliente = await buscarClientePorTelefone("(98) 98733-7248");
  console.log("✅ CLIENTE encontrado:");
  console.log(cliente);
})();