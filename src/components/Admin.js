import React, { useState } from "react";
import AdminAnalytics from "./AdminAnalytics";
import AdminReservas from "./AdminReservas";
import AdminAnalyticsCharts from "./AdminAnalyticsCharts";
import AdminAnalyticsPDF from "./AdminAnalyticsPDF";
import AdminDestinos from "./AdminDestinos";
import AdminUsers from "./AdminUsers";
import AdminPromocoes from "./AdminPromocoes";
import AdminVoluntariado from "./AdminVoluntariado";
import AdminReviews from "./AdminReviews";
import AdminLogs from "./AdminLogs";
import AdminLojas from "./AdminLojas";
import AdminParceiros from "./AdminParceiros";
import AdminBanners from "./AdminBanners";
import AdminInfluencers from "./AdminInfluencers";

export default function Admin() {
  const [pagina, setPagina] = useState("menu");

  if (pagina === "analytics") return <AdminAnalytics onBack={() => setPagina("menu")} />;
  if (pagina === "reservas") return <AdminReservas onBack={() => setPagina("menu")} />;
  if (pagina === "analyticscharts") return <AdminAnalyticsCharts onBack={() => setPagina("menu")} />;
  if (pagina === "analyticspdf") return <AdminAnalyticsPDF onBack={() => setPagina("menu")} />;
  if (pagina === "destinos") return <AdminDestinos onBack={() => setPagina("menu")} />;
  if (pagina === "users") return <AdminUsers onBack={() => setPagina("menu")} />;
  if (pagina === "promocoes") return <AdminPromocoes onBack={() => setPagina("menu")} />;
  if (pagina === "voluntariado") return <AdminVoluntariado onBack={() => setPagina("menu")} />;
  if (pagina === "reviews") return <AdminReviews onBack={() => setPagina("menu")} />;
  if (pagina === "logs") return <AdminLogs onBack={() => setPagina("menu")} />;
  if (pagina === "lojas") return <AdminLojas onBack={() => setPagina("menu")} />;
  if (pagina === "parceiros") return <AdminParceiros onBack={() => setPagina("menu")} />;
  if (pagina === "banners") return <AdminBanners onBack={() => setPagina("menu")} />;
  if (pagina === "influencers") return <AdminInfluencers onBack={() => setPagina("menu")} />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Painel de Administração</h2>
      <div className="flex flex-col gap-3 mb-8">
        <button className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-900" onClick={() => setPagina("analytics")}>📈 Estatísticas (Analytics)</button>
        <button className="bg-fuchsia-700 text-white px-4 py-2 rounded hover:bg-fuchsia-900" onClick={() => setPagina("analyticscharts")}>📊 Gráficos Analytics</button>
        <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900" onClick={() => setPagina("analyticspdf")}>📝 Exportar Relatório PDF</button>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" onClick={() => setPagina("reservas")}>📋 Reservas</button>
        <button className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-900" onClick={() => setPagina("destinos")}>🌍 Gerir Destinos</button>
        <button className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-900" onClick={() => setPagina("users")}>👥 Utilizadores</button>
        <button className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-900" onClick={() => setPagina("promocoes")}>🏷️ Promoções/Cupões</button>
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900" onClick={() => setPagina("voluntariado")}>👐 Voluntariado</button>
        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setPagina("reviews")}>💬 Reviews/Mensagens</button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900" onClick={() => setPagina("logs")}>🕒 Logs de Atividade</button>
        <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-900" onClick={() => setPagina("lojas")}>🛒 Gerir Loja</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={() => setPagina("parceiros")}>🔗 Gerir Parceiros/Afiliados</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={() => setPagina("banners")}>🖼️ Gerir Banners Publicitários</button>
        <button className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={() => setPagina("influencers")}>🌟 Gerir Influencers</button>
      </div>
      <p className="text-gray-700">
        Funcionalidade administrativa em constante evolução. Usa os botões acima para navegar entre todas as áreas do painel.
      </p>
    </div>
  );
}
