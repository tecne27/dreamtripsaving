import React from "react";

export default function Favoritos({ favoritos, onEscolherDestino, onBack }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>
      <h2 className="text-2xl font-bold text-amber-700 mb-6">Destinos Favoritos</h2>
      {favoritos.length === 0 ? (
        <p className="text-gray-500">Ainda não adicionaste nenhum destino aos favoritos.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {favoritos.map(dest => (
            <div
              key={dest.id}
              className="bg-white rounded-xl shadow p-4 cursor-pointer hover:scale-105 transition"
              onClick={() => onEscolherDestino(dest)}
            >
              <img src={dest.imagemUrl} alt={dest.nome} className="h-36 w-full object-cover rounded mb-3" />
              <h3 className="text-xl font-bold">{dest.nome}</h3>
              <p className="text-gray-700 mb-1">{dest.descricao}</p>
              <span className="text-blue-600 font-semibold">{dest.precoDesde}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
