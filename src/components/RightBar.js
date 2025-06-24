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

  const [show, setShow] = useState(true);

  return (
    <div
      className={`fixed top-0 right-0 h-full z-40 transition-transform duration-300 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        width: 64,
        background: "rgba(255,255,255,0.95)",
        borderLeft: "1px solid #e5e7eb",
        boxShadow: "0 0 24px #0001"
      }}
    >
      <button
        className="absolute top-2 left-[-36px] bg-blue-700 text-white rounded-full w-9 h-9 shadow flex items-center justify-center"
        onClick={() => setShow((s) => !s)}
        title={show ? "Esconder Afiliados" : "Mostrar Afiliados"}
        style={{ outline: "none" }}
      >
        {show ? "→" : "←"}
      </button>
      <div className="flex flex-col items-center pt-14 gap-4 overflow-y-auto h-[92vh] scrollbar-thin">
        {parceiros.map((a) => (
          <a
            key={a.id}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            title={a.nome}
            className="w-11 h-11 flex items-center justify-center hover:scale-110 transition"
          >
            <img src={a.imagem} alt={a.nome} className="w-9 h-9 object-contain bg-white rounded shadow" />
          </a>
        ))}
      </div>
    </div>
  );
}
