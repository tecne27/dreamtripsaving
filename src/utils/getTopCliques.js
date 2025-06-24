import { getFirestore, collection, getDocs } from "firebase/firestore";

export async function getTopCliques() {
  const db = getFirestore();
  const col = collection(db, "cliquesReservas");
  const snap = await getDocs(col);
  const stats = {};

  snap.forEach(doc => {
    const { destinoId, tipoLink } = doc.data();
    const key = `${destinoId}-${tipoLink}`;
    stats[key] = (stats[key] || 0) + 1;
  });

  // Top destinos por tipo
  const porDestino = {};
  Object.entries(stats).forEach(([key, count]) => {
    const [destinoId, tipo] = key.split("-");
    if (!porDestino[destinoId]) porDestino[destinoId] = {};
    porDestino[destinoId][tipo] = count;
  });

  return porDestino;
}
