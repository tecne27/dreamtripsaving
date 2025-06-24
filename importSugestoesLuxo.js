// importSugestoesLuxo.js

const admin = require("firebase-admin");
const serviceAccount = require("./chave-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sugestoes = [
  // 🏝️ Ilhas e resorts de luxo
  { nome: "Lisboa → Maldivas (resort 5★)", pais: "Maldivas", preco: 1200, tipo: "luxo", link: "https://www.booking.com" },
  { nome: "Porto → Bora Bora", pais: "Polinésia Francesa", preco: 1800, tipo: "luxo", link: "https://www.airfrance.com" },
  { nome: "Lisboa → Ilhas Seychelles", pais: "Seychelles", preco: 1400, tipo: "luxo", link: "https://www.qatarairways.com" },

  // 🏙️ Cidades de luxo e compras
  { nome: "Lisboa → Dubai (hotel de luxo)", pais: "Emirados Árabes Unidos", preco: 950, tipo: "luxo", link: "https://www.flydubai.com" },
  { nome: "Porto → Singapura (voo + Marina Bay Sands)", pais: "Singapura", preco: 1100, tipo: "luxo", link: "https://www.singaporeair.com" },
  { nome: "Lisboa → Hong Kong (com vistas de luxo)", pais: "China", preco: 1300, tipo: "luxo", link: "https://www.emirates.com" },

  // 🛥️ Experiências exclusivas
  { nome: "Lisboa → Cruzeiro no Mediterrâneo", pais: "Europa", preco: 850, tipo: "luxo", link: "https://www.msc.com" },
  { nome: "Lisboa → Safari no Quénia (luxo)", pais: "Quénia", preco: 1600, tipo: "luxo", link: "https://www.kayak.com" },
  { nome: "Lisboa → Japão em classe executiva", pais: "Japão", preco: 2200, tipo: "luxo", link: "https://www.ana.co.jp" },

  // ❄️ Neve e montanha de luxo
  { nome: "Lisboa → Aspen (luxo na neve)", pais: "EUA", preco: 1700, tipo: "luxo", link: "https://www.skiaspen.com" },
  { nome: "Porto → Courchevel (Alpes Franceses)", pais: "França", preco: 1500, tipo: "luxo", link: "https://www.luxuryescapes.com" },

  // 🏨 Hotéis premium com spa
  { nome: "Lisboa → Resort 5★ nas Maldivas com spa", pais: "Maldivas", preco: 1350, tipo: "luxo", link: "https://www.booking.com" },
  { nome: "Porto → Hotel de luxo em Florença", pais: "Itália", preco: 890, tipo: "luxo", link: "https://www.expedia.com" },
  { nome: "Lisboa → Hotel flutuante em Estocolmo", pais: "Suécia", preco: 980, tipo: "luxo", link: "https://www.visitsweden.com" }
];

async function importarSugestoesLuxo() {
  for (const sugestao of sugestoes) {
    try {
      await db.collection("sugestoesIA").add(sugestao);
      console.log(`💎 Inserido (luxo): ${sugestao.nome}`);
    } catch (err) {
      console.error("❌ Erro ao inserir luxo:", sugestao.nome, err);
    }
  }
  console.log("🌍 Importação de viagens de luxo completa!");
}

importarSugestoesLuxo();


