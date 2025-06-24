import React from "react";
import { trackCliqueDestino } from "../utils/trackCliqueDestino";

export default function DetalheDestino({ destino, onBack }) {
  if (!destino) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>

      <img
        src={destino.imagemUrl}
        alt={destino.nome}
        className="w-full h-64 object-cover rounded-xl shadow mb-6"
      />

      <h2 className="text-3xl font-extrabold text-blue-800 mb-2">{destino.nome}</h2>
      <p className="text-lg text-gray-800 mb-2">{destino.descricao}</p>
      <p className="text-xl font-bold text-blue-600 mb-2">{destino.precoDesde}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {destino.categoria.map(cat => (
          <span key={cat} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
            {cat}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mb-5">
        {destino.links.hotel && (
          <a
            href={destino.links.hotel}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "hotel")}
          >
            Reservar Hotel
          </a>
        )}
        {destino.links.voo && (
          <a
            href={destino.links.voo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-600 text-white px-4 py-2 rounded-xl hover:bg-amber-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "voo")}
          >
            Voos
          </a>
        )}
        {destino.links.autocarro && (
          <a
            href={destino.links.autocarro}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "autocarro")}
          >
            Autocarro
          </a>
        )}
        {destino.links.comboio && (
          <a
            href={destino.links.comboio}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "comboio")}
          >
            Comboio
          </a>
        )}
        {destino.links.barco && (
          <a
            href={destino.links.barco}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "barco")}
          >
            Barco
          </a>
        )}
        {destino.links.surf && (
          <a
            href={destino.links.surf}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "surf")}
          >
            Surf
          </a>
        )}
        {destino.links.cruzeiro && (
          <a
            href={destino.links.cruzeiro}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "cruzeiro")}
          >
            Cruzeiro
          </a>
        )}
        {destino.links.neve && (
          <a
            href={destino.links.neve}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "neve")}
          >
            Neve
          </a>
        )}
        {destino.links.trilhos && (
          <a
            href={destino.links.trilhos}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "trilhos")}
          >
            Trilhos
          </a>
        )}
        {destino.links.restaurante && (
          <a
            href={destino.links.restaurante}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "restaurante")}
          >
            Restaurantes
          </a>
        )}
        {destino.links.mapa && (
          <a
            href={destino.links.mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 shadow"
            onClick={() => trackCliqueDestino(destino.id, "mapa")}
          >
            Ver no Mapa
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {destino.tags?.map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
