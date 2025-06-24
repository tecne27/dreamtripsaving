import React from 'react';

const SaldoPontos = ({ saldoAtual, pontosAtuais }) => {
  const metaPontos = 1000;

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-lg font-bold mb-2">💶 Saldo Atual</h2>
      <p className="mb-2 text-xl">Saldo: <strong>{saldoAtual.toFixed(2)} €</strong></p>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Pontos atuais: <strong>{pontosAtuais}</strong> / {metaPontos}
        </p>
        <div className="w-full bg-gray-200 rounded h-2 mt-1">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${Math.min((pontosAtuais / metaPontos) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SaldoPontos;
