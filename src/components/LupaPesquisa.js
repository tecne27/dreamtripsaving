// LupaPesquisa.js — componente de pesquisa inteligente
import React, { useState } from 'react';

const LupaPesquisa = ({ setFiltro }) => {
  const [termo, setTermo] = useState('');

  const handlePesquisar = () => {
    setFiltro(termo.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handlePesquisar();
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        onKeyDown={handleKeyPress}
        className="border p-2 rounded w-full md:w-64"
        placeholder="Pesquisar destino, tipo de viagem..."
      />
      <button
        onClick={handlePesquisar}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        🔍
      </button>
    </div>
  );
};

export default LupaPesquisa;


