// importSugestoesGastronomia.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  // 🍷 Enoturismo
  { nome: "Lisboa → Douro (tour de vinhos)", pais: "Portugal", preco: 85, tipo: "gastronomia", link: "https://www.porto.travel" },
  { nome: "Lisboa → Alentejo (quintas e degustações)", pais: "Portugal", preco: 90, tipo: "gastronomia", link: "https://www.visitalentejo.pt" },
  { nome: "Porto → Rioja (vinhos espanhóis)", pais: "Espanha", preco: 100, tipo: "gastronomia", link: "https://www.lariojaturismo.com" },

  // 🍝 Roteiros culinários
  { nome: "Lisboa → Bolonha (massas e tradição)", pais: "Itália", preco: 55, tipo: "gastronomia", link: "https://www.bolognawelcome.com" },
  { nome: "Lisboa → Lyon (capital da gastronomia)", pais: "França", preco: 60, tipo: "gastronomia", link: "https://en.lyon-france.com" },
  { nome: "Lisboa → Istambul (cozinha turca autêntica)", pais: "Turquia", preco: 80, tipo: "gastronomia", link: "https://www.hometurkey.com" },

  // 🧀 Queijos e mercados
  { nome: "Lisboa → Paris (mercados gourmet)", pais: "França", preco: 65, tipo: "gastronomia", link: "https://en.parisinfo.com" },
  { nome: "Lisboa → Bruxelas (cervejas e queijos)", pais: "Bélgica", preco: 72, tipo: "gastronomia", link: "https://www.visit.brussels" },
  { nome: "Lisboa → São Miguel (ananas, queijos e chás)", pais: "Portugal", preco: 95, tipo: "gastronomia", link: "https://www.visitazores.com" },

  // 🥘 Gastronomia ibérica
  { nome: "Lisboa → Sevilha (tapas e flamenco)", pais: "Espanha", preco: 48, tipo: "gastronomia", link: "https://www.visitasevilla.es" },
  { nome: "Lisboa → San Sebastián (alta cozinha)", pais: "Espanha", preco: 68, tipo: "gastronomia", link: "https://www.sansebastianturismoa.eus" },
  { nome: "Porto → Viseu (gastronomia da Beira)", pais: "Portugal", preco: 35, tipo: "gastronomia", link: "https://www.visitviseu.pt" }
];

async function importarSugestoesGastronomia() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`🍷 Sugestão gastronómica inserida: ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir gastronomia:", sugestao.nome, err);
    }
  }
  console.log("🍽️ Importação de sugestões gastronómicas concluída!");
}

importarSugestoesGastronomia();


