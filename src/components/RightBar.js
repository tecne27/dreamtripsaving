import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function RightBar() {
  const [parceiros, setParceiros] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "parceiros"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setParceiros(arr);
    });
    return () => unsub();
  }, []);

  return (
    <aside
      className="fixed top-0 right-0 h-full z-40"
      style={{
        width: 72,
        background: "rgba(255,255,255,0.96)",
        borderLeft: "1px solid #e5e7eb",
        boxShadow: "0 0 24px #0001",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className="flex flex-col items-center pt-12 gap-5 overflow-y-auto h-full scrollbar-thin">
        {parceiros.map((a) => (
          <a
            key={a.id}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            title={a.nome}
            className="w-12 h-12 flex items-center justify-center hover:scale-110 transition"
          >
            <img src={a.imagem} alt={a.nome} className="w-10 h-10 object-contain bg-white rounded shadow" />
          </a>
        ))}
        {/* Bloco final para convite a afiliação */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-semibold text-blue-700">Queres ser parceiro?</span>
          <a
            href="/contacto"
            className="bg-blue-600 text-white px-3 py-1 rounded-xl text-xs font-bold shadow hover:bg-blue-800 transition"
          >
            Torna-te parceiro
          </a>
        </div>
      </div>
    </aside>
  );
}
