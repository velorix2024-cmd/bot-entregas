console.log("✅ google.js carregado de:", __filename);

const { google } = require("googleapis");

// ✅ SUA CHAVE DIRETO NO CÓDIGO (OPÇÃO 1)
const credentials = {
  "type": "service_account",
  "project_id": "enhanced-ward-481020-e2",
  "private_key_id": "57d60a20a3deb63fbbbb9b337861104186ea27be",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDb3lWnL9hyPeqQ\nRyOL42rDe1Fh+zpUdpsILhqEn32k0WD3yCqJSqv0vccexSaRJMuUSl6upUGHXsVo\n6EAm70QS4EMeF6TCJSmxEBDEeMaKpO3P83x24M8Z3xCXgEqReb7HMUbJ52cJrSw4\nXoW1N2fjel8xzlonvhtkGVRX+pJ6Ws/foh0zQRycBzGsOATdrAtpok4lecrTobCE\nMUMmx8cALlM0zBgwRUsBFT0v2+Vyr0jemdETitxxOXsnskDmYTlQxvH3h0xRKzC4\n9lP3HLZBc6JYNO+nXqgJRERMeSrBBwa7CODbHwCMXdmATFoeDq+ZXQY4mUjpBwnu\n+W0fDaL/AgMBAAECggEAIHCh95xuFZEAGlB8tKeVuYjo3YmJNiwXvLG8tOOpUJeZ\n9IUijYYob+BOUEJrac/hf5wncyIr1HLNsqhNytDTnOtcy8RWSVTdXWQO7UYamRsz\ngVKeAxYxSFJqqsfBeMxbMx2YobKUN8/Grfx4QuANYnlMMVeOYr3AYdkA4kg0s3uL\nl+0JFrRLRHXFxhoVCWWe8a6FCaqMH1p9pFfz8fHGOWkZMxfY21km677SLzNILrNS\nZvmNzdZvxTmyNhTGmbWA82/ubJ3OGZLdr2MuV/0jLkRbe/NIw52WV1wVpABrvsQn\nyeBNFwSL4sSW6QEYxiQGmDGc3pE9gRBMe+dKNFju/QKBgQDy1I1naglBDhjBBsre\n4syvNcu2CCJNvhmavJFd5icjL1hUNCq3+EvMpVSwil//+eaunMLAjsN5x4UILiFP\n9MS5yIdzbUXySUZJ5UHQhRyjpWXvJVX9xsFMRL7ejr0JinJlkMS7D6YJ49gykq2k\niGe79m/OQMa32w7GTVolLLHwtQKBgQDnyvtEaelLOB/38zNSw1LjVgt/qPf479Cg\nbwlna2Rdd4AwDjlbXlmQcYxDXPGAXT/epcIF010PFx0bQX/EcJHFhTulVoD6hoZk\nbk82yE8s7aKdfork7wwoUJ2Rr/dca2oA26+fsMTUhhDGAeLqLyIN4W26AivdaeVt\nC85gkJh5YwKBgGqiEhJGixfJQ++HtxCXUcDjA7jE66NuBjpf8gnk5mzZ/pTDb7rn\nywlr1LvNmAiFSdqFtjPuvUI97lpAP5qn5reaqnhylNOnf7k1dmhF++SU3iVdJNzT\nKdD/Iz4COlr1M/UL1Ig8f/I53peet6fXyo3M0x4kbd8Qz/UexKYscVs9AoGAT1ha\nfubKZ2dE+jmUHgaivxNbSE3s5JgjEGgyDebjKmOXy9tyouY/PoTAAOc1/DzveiW/\nrwLVXi8JVaUsOXBXVgfvjP95k0ithH+GOjiDcdu+yK7imM+Dl+FQruhPgqF6XeTV\nz5JRLnbeEwneRU/xFlNOnlfT8C0pzhQ2hzO4HgUCgYEAlBTzdixiQwMZ1QaPmCbG\nU0W58UjhCLu92LzN8c7D3K+WnqwRO5/BbMvOvl8PIPqgY4sRym84QACiMj5eT7In\nYdHrHaeJUDvHY6WtHbNFDLvKXPFCwhBXW57B9yDwoeZchPK8OmXDE7UmK14fptA7\nDqcH2W1QCsEAvib1Nm6Uecs=\n-----END PRIVATE KEY-----\n",
  "client_email": "velorix-bot@enhanced-ward-481020-e2.iam.gserviceaccount.com",
  "client_id": "114746154911784783212",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/velorix-bot%40enhanced-ward-481020-e2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

async function getSheetsClient() {
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