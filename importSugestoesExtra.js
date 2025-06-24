// importSugestoesExtra.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  // 🚆 Comboio
  { nome: "Porto → Guimarães", pais: "Portugal", preco: 3.25, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Lisboa → Almada", pais: "Portugal", preco: 2.5, tipo: "comboio", link: "https://www.fertagus.pt" },
  { nome: "Lisboa → Vila Franca", pais: "Portugal", preco: 3, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Lisboa → Santarém", pais: "Portugal", preco: 5.5, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Porto → Espinho", pais: "Portugal", preco: 2.1, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Coimbra → Figueira da Foz", pais: "Portugal", preco: 4.8, tipo: "comboio", link: "https://www.cp.pt" },
  { nome: "Braga → Barcelos", pais: "Portugal", preco: 2.8, tipo: "comboio", link: "https://www.cp.pt" },

  // 🚌 Autocarro
  { nome: "Lisboa → Leiria", pais: "Portugal", preco: 7.5, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Braga → Porto", pais: "Portugal", preco: 6.5, tipo: "autocarro", link: "https://www.flixbus.pt" },
  { nome: "Lisboa → Badajoz", pais: "Espanha", preco: 10, tipo: "autocarro", link: "https://www.flixbus.pt" },
  { nome: "Lisboa → Guarda", pais: "Portugal", preco: 9, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Lisboa → Viseu", pais: "Portugal", preco: 8.5, tipo: "autocarro", link: "https://rede-expressos.pt" },
  { nome: "Funchal → Machico", pais: "Portugal", preco: 3.3, tipo: "autocarro", link: "https://www.sam.pt" },
  { nome: "Ponta Delgada → Lagoa", pais: "Portugal", preco: 2.2, tipo: "autocarro", link: "https://www.smiguel.pt" },
  { nome: "Lisboa → Castelo Branco", pais: "Portugal", preco: 10, tipo: "autocarro", link: "https://rede-expressos.pt" },

  // ✈️ Avião
  { nome: "Lisboa → Barcelona", pais: "Espanha", preco: 19, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Porto → Bruxelas", pais: "Bélgica", preco: 22, tipo: "avião", link: "https://www.easyjet.com" },
  { nome: "Faro → Londres", pais: "Reino Unido", preco: 26, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Lisboa → Roma", pais: "Itália", preco: 24, tipo: "avião", link: "https://www.vueling.com" },
  { nome: "Lisboa → Marraquexe", pais: "Marrocos", preco: 30, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Lisboa → Milão", pais: "Itália", preco: 21, tipo: "avião", link: "https://www.easyjet.com" },

  // 🎒 Mochila
  { nome: "Lisboa → Azenhas do Mar", pais: "Portugal", preco: 4, tipo: "mochila", link: "" },
  { nome: "Porto → Vila do Conde", pais: "Portugal", preco: 2.5, tipo: "mochila", link: "" },
  { nome: "Lisboa → Peniche", pais: "Portugal", preco: 7, tipo: "mochila", link: "" },
  { nome: "Porto → Douro", pais: "Portugal", preco: 8, tipo: "mochila", link: "" },
  { nome: "Lisboa → Arrábida", pais: "Portugal", preco: 6.5, tipo: "mochila", link: "" },
  { nome: "Lisboa → Mafra", pais: "Portugal", preco: 4.5, tipo: "mochila", link: "" },

  // 🌍 Internacional Low-Cost
  { nome: "Porto → Paris", pais: "França", preco: 23, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Lisboa → Zurique", pais: "Suíça", preco: 28, tipo: "avião", link: "https://www.easyjet.com" },
  { nome: "Faro → Frankfurt", pais: "Alemanha", preco: 27, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Lisboa → Luxemburgo", pais: "Luxemburgo", preco: 22, tipo: "avião", link: "https://www.ryanair.com" },
  { nome: "Porto → Genebra", pais: "Suíça", preco: 21, tipo: "avião", link: "https://www.easyjet.com" },
  { nome: "Lisboa → Bratislava", pais: "Eslováquia", preco: 25, tipo: "avião", link: "https://www.ryanair.com" }
];

async function importarSugestoesExtra() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`✅ Inserido: ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir:", sugestao.nome, err);
    }
  }
  console.log("🚀 Importação extra completa!");
}

importarSugestoesExtra();

