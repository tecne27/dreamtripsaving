// Importações Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuração do teu projeto Firebase (os dados já são os teus)
const firebaseConfig = {
  apiKey: "AIzaSyBjEfHNI8elgrWltdJ_wDVM8N_bBpESeFo",
  authDomain: "dreamtripsaving-e777e.firebaseapp.com",
  projectId: "dreamtripsaving-e777e",
  storageBucket: "dreamtripsaving-e777e.firebasestorage.app",
  messagingSenderId: "1069988626907",
  appId: "1:1069988626907:web:c2e4d9808defa8d1afa7fe"
};

// Inicializar a app
const app = initializeApp(firebaseConfig);

// Inicializar Analytics (só funciona em produção/HTTPS)
const analytics = getAnalytics(app);

// Exportar Firestore, Auth e Analytics
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };
