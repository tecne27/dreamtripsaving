import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function Sugestoes() {
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "sugestoes"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setSugestoes(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="text-center py-10">A carregar sugestões...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-800">Sugestões</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sugestoes.length === 0 && (
          <div className="col-span-3 text-center text-gray-500">Nenhuma sugestão disponível.</div>
        )}
        {sugestoes.map((s, i) => (
          <div key={s.id || i} className="bg-white rounded-xl shadow-xl p-4 flex flex-col items-center transition hover:scale-105">
            <img src={s.imagem} alt={s.nome} className="h-36 mb-3 object-cover rounded" />
            <div className="font-bold text-blue-700">{s.nome}</div>
            <div className="text-gray-700 text-sm my-2">{s.descricao}</div>
            <div className="text-blue-700 font-semibold text-lg mb-2">{s.preco ? s.preco : ""}</div>
            {s.link && (
              <a
                href={s.link}
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
    </div>
  );
}
