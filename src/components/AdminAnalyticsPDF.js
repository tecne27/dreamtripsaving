import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import destinos from "../data/destinos";

export default function AdminAnalyticsPDF({ onBack }) {
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

  function exportPDF(stats) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Cliques e Reservas - DreamTripSavings", 14, 18);
    doc.setFontSize(11);
    doc.text(`Data: ${new Date().toLocaleString()}`, 14, 26);

    const rows = [];
    Object.entries(stats).forEach(([destinoId, tipos]) => {
      const destino = destinos.find(d => String(d.id) === String(destinoId));
      Object.entries(tipos).forEach(([tipo, count]) => {
        rows.push([
          destino ? destino.nome : destinoId,
          tipo,
          count
        ]);
      });
    });

    autoTable(doc, {
      head: [["Destino", "Tipo", "Quantidade"]],
      body: rows,
      startY: 36,
      theme: "striped"
    });

    doc.setFontSize(10);
    doc.text("DreamTripSavings.com", 14, doc.internal.pageSize.height - 10);

    doc.save("relatorio_cliques_destinos.pdf");
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
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Exportar Relatório PDF</h2>
      <button
        onClick={() => exportPDF(stats)}
        className="mb-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900"
        disabled={!stats}
      >
        Exportar Relatório PDF
      </button>
      {!stats && <div>A carregar...</div>}
      {stats && (
        <div className="text-gray-600 mt-4">
          O relatório inclui todos os dados atuais de cliques e reservas por destino e tipo.
        </div>
      )}
    </div>
  );
}
