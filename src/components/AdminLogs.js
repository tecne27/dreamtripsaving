import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function AdminLogs({ onBack }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetch() {
      const db = getFirestore();
      const snap = await getDocs(collection(db, "logsAdmin"));
      const arr = [];
      snap.forEach(doc => arr.push(doc.data()));
      setLogs(arr);
    }
    fetch();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>
        ← Retroceder
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Logs de Atividade (Admin)</h2>
      <table className="min-w-full border mt-4 bg-white shadow rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Data/Hora</th>
            <th className="px-4 py-2 border-b text-left">Utilizador</th>
            <th className="px-4 py-2 border-b text-left">Ação</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 && <tr><td colSpan={3} className="text-gray-500 text-center">Sem logs ainda.</td></tr>}
          {logs.map((l, idx) => (
            <tr key={l.data + l.utilizador + idx}>
              <td className="px-4 py-2 border-b">{l.data}</td>
              <td className="px-4 py-2 border-b">{l.utilizador}</td>
              <td className="px-4 py-2 border-b">{l.acao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
