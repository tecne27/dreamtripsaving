// importSugestoesAventura.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  // 🧗‍♂️ Trilhos e hiking
  { nome: "Lisboa → Gerês (trilhos e cascatas)", pais: "Portugal", preco: 25, tipo: "aventura", link: "https://www.icnf.pt" },
  { nome: "Lisboa → Serra da Estrela (montanha)", pais: "Portugal", preco: 30, tipo: "aventura", link: "https://www.centerofportugal.com" },
  { nome: "Porto → Caminho de Santiago", pais: "Espanha", preco: 40, tipo: "aventura", link: "https://www.caminodesantiago.gal" },
  { nome: "Lisboa → Dolomitas (trilhos de alta montanha)", pais: "Itália", preco: 65, tipo: "aventura", link: "https://www.dolomiti.it" },

  // 🏄 Surf e mar
  { nome: "Lisboa → Nazaré (surf XXL)", pais: "Portugal", preco: 12, tipo: "aventura", link: "https://www.nazare.pt" },
  { nome: "Lisboa → Ericeira (reserva de surf)", pais: "Portugal", preco: 10, tipo: "aventura", link: "https://www.ericeira.pt" },
  { nome: "Porto → Peniche (surf spot)", pais: "Portugal", preco: 14, tipo: "aventura", link: "https://www.peniche.pt" },
  { nome: "Lisboa → Bali (surf tropical)", pais: "Indonésia", preco: 850, tipo: "aventura", link: "https://www.balitourismboard.org" },

  // 🎿 Ski e neve
  { nome: "Lisboa → Andorra (ski económico)", pais: "Andorra", preco: 50, tipo: "aventura", link: "https://www.grandvalira.com" },
  { nome: "Lisboa → Serra Nevada", pais: "Espanha", preco: 48, tipo: "aventura", link: "https://www.sierranevada.es" },
  { nome: "Porto → Alpes Suíços", pais: "Suíça", preco: 100, tipo: "aventura", link: "https://www.myswitzerland.com" },

  // 🚴 Ciclismo e natureza
  { nome: "Lisboa → Ecopista do Dão (bicicleta)", pais: "Portugal", preco: 20, tipo: "aventura", link: "https://www.ecopistadodao.pt" },
  { nome: "Porto → Douro Vinhateiro (bike tours)", pais: "Portugal", preco: 35, tipo: "aventura", link: "https://www.visitdouro.pt" },

  // 🪂 Radicais
  { nome: "Lisboa → Saltos de paraquedas em Évora", pais: "Portugal", preco: 120, tipo: "aventura", link: "https://www.skydive.pt" },
  { nome: "Lisboa → Rafting no Rio Paiva", pais: "Portugal", preco: 40, tipo: "aventura", link: "https://www.naturtravel.pt" },
  { nome: "Porto → Via Ferrata de Arouca", pais: "Portugal", preco: 30, tipo: "aventura", link: "https://www.cm-arouca.pt" }
];

async function importarSugestoesAventura() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`🔥 Aventura inserida: ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir aventura:", sugestao.nome, err);
    }
  }
  console.log("🏕️ Importação de aventuras concluída!");
}

importarSugestoesAventura();

