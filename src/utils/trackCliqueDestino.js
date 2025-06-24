import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import destinos from "../data/destinos";

export async function trackCliqueDestino(destinoId, tipoLink) {
  try {
    // 1. Grava o clique no Firestore
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    await addDoc(collection(db, "cliquesReservas"), {
      destinoId,
      tipoLink,
      user: user ? user.email : "guest",
      data: new Date().toISOString()
    });

    // 2. Envia email para o admin via Cloud Function
    const functions = getFunctions();
    const sendEmail = httpsCallable(functions, 'novaLeadEmail');
    const destinoObj = destinos.find(d => String(d.id) === String(destinoId));
    await sendEmail({
      destino: { nome: destinoObj ? destinoObj.nome : String(destinoId) },
      tipo: tipoLink,
      userEmail: user ? user.email : "guest"
    });

  } catch (e) {
    // Não bloquear navegação por erro de tracking/email
    console.error("Erro ao gravar tracking ou enviar email:", e);
  }
}
