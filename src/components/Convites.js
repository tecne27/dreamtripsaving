
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Convites() {
  const { currentUser } = useAuth();
  const [copiado, setCopiado] = useState(false);
  const linkConvite = `https://dreamtripsavings.com/register?ref=${currentUser?.uid}`;

  const copiar = () => {
    navigator.clipboard.writeText(linkConvite);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Convida Amigos</h2>
      <div className="mb-2">Partilha este link para ganhar pontos sempre que um amigo se regista:</div>
      <div className="flex items-center mb-4">
        <input className="flex-1 border rounded px-2 py-1" value={linkConvite} readOnly />
        <button className="ml-2 px-3 py-1 bg-green-600 text-white rounded" onClick={copiar}>{copiado ? "Copiado!" : "Copiar"}</button>
      </div>
      <div className="text-sm text-gray-500">Vais poder ver aqui os amigos registados e os teus pontos de recompensa.</div>
    </div>
  );
}
