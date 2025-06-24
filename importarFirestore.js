// importarFirestore.js

const { initializeApp, applicationDefault } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore/lite");

// Usa a tua config.js
const firebaseConfig = {
  apiKey: "AIzaSyBjEfHNI8elgrWltdJ_wDVM8N_bBpESeFo",
  authDomain: "dreamtripsaving-e777e.firebaseapp.com",
  projectId: "dreamtripsaving-e777e",
  storageBucket: "dreamtripsaving-e777e.firebasestorage.app",
  messagingSenderId: "1069988626907",
  appId: "1:1069988626907:web:c2e4d9808defa8d1afa7fe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// COLOCA AQUI O TEU ARRAY COMPLETO A IMPORTAR
const produtos = [
  {
    nome: "Mochila de Viagem 40L Impermeável",
    descricao: "Mochila robusta, ideal para viagens de avião, trilhos e escapadinhas. Compartimento especial para portátil.",
    imagem: "https://m.media-amazon.com/images/I/71o9Zb79qEL._AC_SY450_.jpg",
    preco: "€39,90",
    link: "https://www.amazon.com/dp/B08CFSZLQ4?tag=dreamtripsav-21"
  },
  // ... restantes produtos ou destinos ou sugestões ...
];

async function importarTodos() {
  for (const p of produtos) {
    await addDoc(collection(db, "produtosLoja"), p);
    console.log("Importado:", p.nome);
  }
  console.log("✔️ Todos importados!");
  process.exit(0);
}

importarTodos();
