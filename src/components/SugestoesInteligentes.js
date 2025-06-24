// /src/components/SugestoesInteligentes.js

import React from "react";
import sugestoes from "../data/sugestoes";
import destinos from "../data/destinos";

export default function SugestoesInteligentes({ onBack, onVerMais }) {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        {onBack && (
          <button
            className="mr-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            onClick={onBack}
            title="Retroceder"
          >
            ← Voltar
          </button>
        )}
        <h2 className="text-3xl font-bold text-amber-700">Sugestões Inteligentes</h2>
      </div>
      <div className="space-y-8">
        {sugestoes.map(sug => (
          <div key={sug.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={sug.imagemUrl}
                alt={sug.titulo}
                className="w-full md:w-64 h-48 object-cover rounded mb-3"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">{sug.titulo}</h3>
                <p className="text-gray-700 mb-2">{sug.descricao}</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {sug.destinos.map(destId => {
                    const d = destinos.find(dest => dest.id === destId);
                    return (
                      d && (
                        <a
                          key={d.id}
                          href={d.links.hotel || d.links.voo || d.links.comboio || d.links.autocarro}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                        >
                          {d.nome}
                        </a>
                      )
                    );
                  })}
                </div>
                {onVerMais && (
                  <button
                    className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700"
                    onClick={() => onVerMais(sug)}
                  >
                    Ver mais
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

