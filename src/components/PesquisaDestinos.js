import React, { useState } from "react";
import destinos from "../data/destinos";

export default function PesquisaDestinos({ onEscolherDestino, onBack }) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const categorias = Array.from(new Set(destinos.map(d => d.categoria)));

  const resultados = destinos.filter(dest =>
    (!query || dest.nome.toLowerCase().includes(query.toLowerCase()) || dest.pais.toLowerCase().includes(query.toLowerCase())) &&
    (!categoria || dest.categoria === categoria)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Pesquisar Destinos</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Pesquisar destino ou país..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        >
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option value={cat} key={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {resultados.length === 0 && (
          <p className="text-gray-500">Nenhum destino encontrado.</p>
        )}
        {resultados.map(dest => (
          <div
            key={dest.id}
            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-200"
            onClick={() => onEscolherDestino(dest)}
            tabIndex={0}
          >
            <img src={dest.imagemUrl} alt={dest.nome} className="h-36 w-full object-cover rounded mb-3" />
            <h3 className="text-xl font-bold">{dest.nome}</h3>
            <p className="text-gray-700 mb-1">{dest.descricao}</p>
            <span className="text-blue-600 font-semibold">{dest.precoDesde}</span>
          </div>
        ))}
      </div>
    </div>
  );
}