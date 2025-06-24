// importSugestoesBemEstar.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  // 🧘 Retiros de bem-estar
  { nome: "Lisboa → Bali (retiro espiritual)", pais: "Indonésia", preco: 950, tipo: "bem-estar", link: "https://www.bookretreats.com" },
  { nome: "Porto → Ibiza (retiro detox)", pais: "Espanha", preco: 780, tipo: "bem-estar", link: "https://www.bookyogaretreats.com" },
  { nome: "Lisboa → Sintra (retiro mindfulness)", pais: "Portugal", preco: 120, tipo: "bem-estar", link: "https://www.sintraretreat.pt" },

  // 🌿 Natureza e saúde
  { nome: "Porto → Termas de Monfortinho", pais: "Portugal", preco: 85, tipo: "bem-estar", link: "https://www.termas.pt" },
  { nome: "Lisboa → Caldas da Rainha", pais: "Portugal", preco: 70, tipo: "bem-estar", link: "https://www.cm-caldas-rainha.pt" },
  { nome: "Lisboa → Madeira (passeios ecológicos e spa)", pais: "Portugal", preco: 180, tipo: "bem-estar", link: "https://www.visitmadeira.pt" },

  // 🌸 Spas e hotéis relaxantes
  { nome: "Lisboa → Alentejo Marmòris Spa Hotel", pais: "Portugal", preco: 160, tipo: "bem-estar", link: "https://www.alentejomarmoris.com" },
  { nome: "Porto → Vidago Palace Hotel & Spa", pais: "Portugal", preco: 190, tipo: "bem-estar", link: "https://www.vidagopalace.com" },
  { nome: "Lisboa → Inspira Liberdade Boutique Hotel (spa urbano)", pais: "Portugal", preco: 135, tipo: "bem-estar", link: "https://www.inspirahotels.com" },

  // 🌞 Escapadinhas relax
  { nome: "Lisboa → Costa Vicentina (retiro na natureza)", pais: "Portugal", preco: 100, tipo: "bem-estar", link: "https://www.visitcostavicentina.com" },
  { nome: "Lisboa → Douro Valley (hotel spa e vinhos)", pais: "Portugal", preco: 145, tipo: "bem-estar", link: "https://www.sixsenses.com" },
  { nome: "Lisboa → Lago di Como (retiro de luxo)", pais: "Itália", preco: 600, tipo: "bem-estar", link: "https://www.lakecomo.is" }
];

async function importarSugestoesBemEstar() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`🌿 Bem-estar inserido: ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir bem-estar:", sugestao.nome, err);
    }
  }
  console.log("🧘 Importação de sugestões de bem-estar concluída!");
}

importarSugestoesBemEstar();


