// importSugestoesEventos.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  // 🎉 Festas e vida noturna
  { nome: "Lisboa → Ibiza (festas de verão)", pais: "Espanha", preco: 60, tipo: "evento", link: "https://www.ibiza-spotlight.com" },
  { nome: "Porto → Mykonos (verão VIP)", pais: "Grécia", preco: 65, tipo: "evento", link: "https://www.mykonosbest.eu" },

  // 🎵 Festivais de música
  { nome: "Lisboa → Tomorrowland", pais: "Bélgica", preco: 85, tipo: "evento", link: "https://www.tomorrowland.com" },
  { nome: "Lisboa → NOS Alive", pais: "Portugal", preco: 50, tipo: "evento", link: "https://www.nosalive.com" },
  { nome: "Porto → Primavera Sound Barcelona", pais: "Espanha", preco: 70, tipo: "evento", link: "https://www.primaverasound.com" },

  // 🍺 Eventos culturais
  { nome: "Lisboa → Oktoberfest Munique", pais: "Alemanha", preco: 90, tipo: "evento", link: "https://www.oktoberfest.de" },
  { nome: "Lisboa → Carnaval de Veneza", pais: "Itália", preco: 72, tipo: "evento", link: "https://www.carnevale.venezia.it" },
  { nome: "Lisboa → São João no Porto", pais: "Portugal", preco: 15, tipo: "evento", link: "https://www.porto.pt" },
  { nome: "Lisboa → Carnaval do Rio", pais: "Brasil", preco: 150, tipo: "evento", link: "https://www.rio-carnival.net" },

  // ⚽ Desporto e competições
  { nome: "Lisboa → Final da Champions League (varia)", pais: "Europa", preco: 120, tipo: "evento", link: "https://www.uefa.com" },
  { nome: "Lisboa → GP Mónaco F1", pais: "Mónaco", preco: 140, tipo: "evento", link: "https://www.formula1.com" },
  { nome: "Lisboa → GP Abu Dhabi F1", pais: "E.A.U.", preco: 160, tipo: "evento", link: "https://www.formula1.com" }
];

async function importarSugestoesEventos() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`🎉 Evento inserido: ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir evento:", sugestao.nome, err);
    }
  }
  console.log("🎊 Importação de eventos e festas concluída!");
}

importarSugestoesEventos();


