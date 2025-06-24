import React from "react";

export default function AdminReservas({ onBack }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Administração de Reservas</h2>
      <p className="text-gray-700 mb-8">
        Aqui vão aparecer todas as reservas reais feitas no site, assim que ativares o tracking/API dos parceiros afiliados.
        <br />
        Até lá, as reservas são feitas diretamente nos sites dos parceiros (Booking, Omio, Skyscanner, etc.), mas podes monitorizar cliques e leads a partir do teu dashboard do programa de afiliados.
      </p>
      <p className="text-gray-400 italic">
        (Integração total disponível logo que tens acesso a API/tracking dos parceiros.)
      </p>
    </div>
  );
}
