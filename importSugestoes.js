// importSugestoes.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json"); // Substitui pelo nome real do teu ficheiro

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  { nome: "Lisboa → Setúbal", pais: "Portugal", preco: 5, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Porto → Braga", pais: "Portugal", preco: 3.5, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Lisboa → Sintra", pais: "Portugal", preco: 4.5, tipo: "mochila", link: "https://www.cp.pt" },
  { nome: "Faro → Lagos", pais: "Portugal", preco: 6, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Coimbra → Aveiro", pais: "Portugal", preco: 5, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Porto → Madrid", pais: "Espanha", preco: 19, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Braga → Gerês", pais: "Portugal", preco: 7, tipo: "mochila", link: "" },
  { nome: "Lisboa → Évora", pais: "Portugal", preco: 8, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Lisboa → Coimbra", pais: "Portugal", preco: 12, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Lisboa → Paris", pais: "França", preco: 25, tipo: "avião", link: "https://www.easyjet.com" },
  { nome: "Porto → Vigo", pais: "Espanha", preco: 10, tipo: "autocarro", link: "https://www.flixbus.pt" },
  { nome: "Lisboa → Fátima", pais: "Portugal", preco: 6.5, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Lisboa → Cascais", pais: "Portugal", preco: 2.5, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Lisboa → Nazaré", pais: "Portugal", preco: 9, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Porto → Aveiro", pais: "Portugal", preco: 3.5, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Lisboa → Óbidos", pais: "Portugal", preco: 8, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Lisboa → Sevilha", pais: "Espanha", preco: 19, tipo: "autocarro", link: "https://www.flixbus.pt" },
  { nome: "Lisboa → Porto (mochila)", pais: "Portugal", preco: 10, tipo: "mochila", link: "" },
  { nome: "Lisboa → Londres", pais: "Reino Unido", preco: 29, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Funchal → Porto Santo", pais: "Portugal", preco: 15, tipo: "avião", link: "https://www.bintercanarias.com" }
];

async function importarSugestoes() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`✅ Inserido: ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir:", sugestao.nome, err);
    }
  }
  console.log("✨ Importação completa!");
}

importarSugestoes();
