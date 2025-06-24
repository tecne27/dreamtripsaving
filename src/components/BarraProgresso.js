import React from 'react';

export default function BarraProgresso({ meta, poupado }) {
  if (!meta || meta <= 0) return null;

  const percentagem = Math.min((poupado / meta) * 100, 100);

  return (
    <div style={{ marginTop: 20 }}>
      <p>Progresso: {percentagem.toFixed(0)}%</p>
      <div style={{
        width: '100%',
        backgroundColor: '#ccc',
        height: '20px',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentagem}%`,
          backgroundColor: '#4caf50',
          height: '100%',
        }} />
      </div>
    </div>
  );
}
