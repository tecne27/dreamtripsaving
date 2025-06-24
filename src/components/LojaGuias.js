import React from 'react';

const guiasDisponiveis = [];

const LojaGuias = ({ guiasDesbloqueados = [] }) => {
  return (
    <div className="bg-gray-50 p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-3 border-b pb-2">📘 Loja de Guias</h2>
      <p className="text-gray-600">Nenhum guia disponível neste momento. Em breve terás acesso a novos guias completos para as tuas viagens!</p>
    </div>
  );
};

export default LojaGuias;
