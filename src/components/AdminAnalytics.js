import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import destinos from "../data/destinos";

export default function AdminAnalytics({ onBack }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const db = getFirestore();
      const snap = await getDocs(collection(db, "cliquesReservas"));
      const raw = {};
      snap.forEach(doc => {
        const { destinoId, tipoLink } = doc.data();
        if (!raw[destinoId]) raw[destinoId] = {};
        raw[destinoId][tipoLink] = (raw[destinoId][tipoLink] || 0) + 1;
      });
      setStats(raw);
    }
    fetchStats();
  }, []);

  // Função para exportar CSV (não requer dependências externas)
  function exportCSV(rawStats) {
    if (!rawStats) return;
    let csv = "Destino,Tipo,Quantidade\n";
    Object.entries(rawStats).forEach(([destinoId, tipos]) => {
      const destino = destinos.find(d => String(d.id) === String(destinoId));
      Object.entries(tipos).forEach(([tipo, count]) => {
        csv += `"${destino ? destino.nome : destinoId}","${tipo}",${count}\n`;
      });
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cliques_destinos.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Estatísticas de Cliques & Reservas</h2>
      <button
        onClick={() => exportCSV(stats)}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Exportar dados (.csv)
      </button>
      {!stats ? (
        <div>A carregar...</div>
      ) : (
        <div className="space-y-4">
          {Object.entries(stats).length === 0 && (
            <div className="text-gray-500">Ainda não existem cliques/registos suficientes.</div>
          )}
          {Object.entries(stats).map(([destinoId, tipos]) => {
            const destino = destinos.find(d => String(d.id) === String(destinoId));
            if (!destino) return null;
            return (
              <div key={destinoId} className="bg-white rounded-xl shadow p-4">
                <h3 className="font-bold text-lg mb-1">{destino.nome}</h3>
                <ul>
                  {Object.entries(tipos).map(([tipo, count]) => (
                    <li key={tipo}>
                      <span className="font-mono">{tipo}</span>: <b>{count}</b> cliques
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

