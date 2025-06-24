// /src/services/saldoService.js
import { db } from "../firebase/config"; // <--- Caminho correto!
import { doc, getDoc } from "firebase/firestore";

// Busca o saldo de um user autenticado (Firebase Firestore)
export async function getUserSaldo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    if (snap.exists() && typeof snap.data().saldo === "number") {
      return snap.data().saldo;
    }
    // Valor default se não existir saldo
    return 0;
  } catch (e) {
    console.error("Erro ao buscar saldo:", e);
    return 0;
  }
}
