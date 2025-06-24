const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const pacotes = require("./pacotes.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importarPacotes() {
  for (let pacote of pacotes) {
    await db.collection("pacotesViagem").doc(pacote.id).set(pacote);
    console.log("Importado:", pacote.nome);
  }
  console.log("Todos os pacotes foram importados!");
  process.exit();
}

importarPacotes().catch((e) => {
  console.error("Erro ao importar:", e);
  process.exit(1);
});
