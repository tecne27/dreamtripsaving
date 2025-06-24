// importSugestoesPremium.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  // 🌴 Praia
  { nome: "Lisboa → Maiorca", pais: "Espanha", preco: 45, tipo: "praia", link: "https://www.vueling.com" },
  { nome: "Porto → Sardenha", pais: "Itália", preco: 55, tipo: "praia", link: "https://www.ryanair.com" },
  { nome: "Faro → Lanzarote", pais: "Espanha", preco: 48, tipo: "praia", link: "https://www.easyjet.com" },

  // 🏔 Neve
  { nome: "Lisboa → Genebra (Alpes)", pais: "Suíça", preco: 49, tipo: "neve", link: "https://www.easyjet.com" },
  { nome: "Porto → Turim (Alpes Italianos)", pais: "Itália", preco: 52, tipo: "neve", link: "https://www.ryanair.com" },
  { nome: "Lisboa → Andorra via Barcelona", pais: "Espanha", preco: 46, tipo: "neve", link: "https://www.alsa.es" },

  // 🍝 Gastronomia
  { nome: "Lisboa → Bolonha", pais: "Itália", preco: 42, tipo: "gastronomia", link: "https://www.ryanair.com" },
  { nome: "Porto → Lyon", pais: "França", preco: 44, tipo: "gastronomia", link: "https://www.easyjet.com" },
  { nome: "Lisboa → San Sebastián", pais: "Espanha", preco: 47, tipo: "gastronomia", link: "https://www.vueling.com" },

  // 🎭 Cultura
  { nome: "Lisboa → Florença", pais: "Itália", preco: 51, tipo: "cultura", link: "https://www.vueling.com" },
  { nome: "Porto → Viena", pais: "Áustria", preco: 53, tipo: "cultura", link: "https://www.ryanair.com" },
  { nome: "Lisboa → Cracóvia", pais: "Polónia", preco: 49, tipo: "cultura", link: "https://www.easyjet.com" },

  // 🌲 Natureza
  { nome: "Lisboa → Açores", pais: "Portugal", preco: 40, tipo: "natureza", link: "https://www.sata.pt" },
  { nome: "Porto → Madeira", pais: "Portugal", preco: 38, tipo: "natureza", link: "https://www.flytap.com" },
  { nome: "Lisboa → Eslovénia (Liubliana)", pais: "Eslovénia", preco: 50, tipo: "natureza", link: "https://www.ryanair.com" },

  // 🏖️ Destinos Relax
  { nome: "Lisboa → Ibiza", pais: "Espanha", preco: 45, tipo: "relax", link: "https://www.ryanair.com" },
  { nome: "Porto → Creta", pais: "Grécia", preco: 59, tipo: "relax", link: "https://www.easyjet.com" },
  { nome: "Lisboa → Dubrovnik", pais: "Croácia", preco: 55, tipo: "relax", link: "https://www.vueling.com" }
];

async function importarSugestoesPremium() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`✅ Inserido: ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir:", sugestao.nome, err);
    }
  }
  console.log("🌟 Importação premium completa!");
}

importarSugestoesPremium();


