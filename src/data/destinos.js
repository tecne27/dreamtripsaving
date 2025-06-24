import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "destinos"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setDestinos(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="text-center py-10">A carregar destinos...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {destinos.length === 0 && (
        <div className="col-span-3 text-center text-gray-500">Nenhum destino disponível.</div>
      )}
      {destinos.map(destino => (
        <div key={destino.id} className="bg-white rounded-xl shadow-xl p-4 flex flex-col items-center transition hover:scale-105">
          <img src={destino.imagem} alt={destino.nome} className="h-36 mb-3 object-cover rounded" />
          <div className="font-bold text-blue-700">{destino.nome}</div>
          <div className="text-gray-700 text-sm my-2">{destino.descricao}</div>
          <div className="text-blue-700 font-semibold text-lg mb-2">{destino.preco ? `${destino.preco} €` : ""}</div>
          {destino.link && (
            <a
              href={destino.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-900 font-bold"
            >
              Ver mais
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
