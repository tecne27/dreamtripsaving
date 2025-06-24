import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import destinos from "../data/destinos";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function AdminAnalyticsCharts({ onBack }) {
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

  if (!stats) return <div className="p-8">A carregar...</div>;

  // Preparar dados para gráfico de barras (top destinos)
  const destinosLabels = [];
  const destinosData = [];
  Object.entries(stats).forEach(([destinoId, tipos]) => {
    const destino = destinos.find(d => String(d.id) === String(destinoId));
    destinosLabels.push(destino ? destino.nome : destinoId);
    destinosData.push(Object.values(tipos).reduce((a, b) => a + b, 0));
  });

  // Preparar dados para gráfico de pizza (tipos de reserva)
  const tiposCount = {};
  Object.values(stats).forEach(tipos =>
    Object.entries(tipos).forEach(([tipo, count]) => {
      tiposCount[tipo] = (tiposCount[tipo] || 0) + count;
    })
  );
  const tiposLabels = Object.keys(tiposCount);
  const tiposData = Object.values(tiposCount);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        className="mb-6 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>
      <h2 className="text-2xl font-bold text-indigo-700 mb-8">Analytics Visual (Gráficos)</h2>

      <div className="mb-12 bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-4">Top Destinos (total de cliques)</h3>
        <Bar
          data={{
            labels: destinosLabels,
            datasets: [{
              label: "Total de cliques",
              data: destinosData,
              backgroundColor: "rgba(59,130,246,0.6)",
            }]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false }
            }
          }}
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-4">Distribuição por Tipo de Reserva</h3>
        <Pie
          data={{
            labels: tiposLabels,
            datasets: [{
              label: "Cliques",
              data: tiposData,
              backgroundColor: [
                "#60a5fa", "#f59e42", "#34d399", "#a78bfa", "#f87171", "#fbbf24", "#6366f1"
              ],
            }]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "right" }
            }
          }}
        />
      </div>
    </div>
  );
}
