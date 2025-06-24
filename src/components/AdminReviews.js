import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function AdminReviews({ onBack }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "reviews"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setReviews(arr);
    });
    return () => unsub();
  }, []);

  const eliminarReview = async id => {
    if (!window.confirm("Eliminar esta review?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "reviews", id));
    } catch {}
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>
        ← Retroceder
      </button>
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Gestão de Reviews & Mensagens</h2>
      <table className="min-w-full border mt-4 bg-white shadow rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Utilizador</th>
            <th className="px-4 py-2 border-b text-left">Mensagem</th>
            <th className="px-4 py-2 border-b text-left">Data</th>
            <th className="px-4 py-2 border-b text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 && <tr><td colSpan={4} className="text-gray-500 text-center">Sem feedback ainda.</td></tr>}
          {reviews.map((r, idx) => (
            <tr key={r.id || idx}>
              <td className="px-4 py-2 border-b">{r.utilizador}</td>
              <td className="px-4 py-2 border-b">{r.mensagem}</td>
              <td className="px-4 py-2 border-b">{r.data || "-"}</td>
              <td className="px-4 py-2 border-b">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => eliminarReview(r.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
