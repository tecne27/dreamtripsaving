// PlanoPremium.js — mostra vantagens e ativa plano com Firestore
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const PlanoPremium = () => {
  const { currentUser } = useAuth();
  const [ativado, setAtivado] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const ativarPremium = async () => {
    if (!currentUser) return;
    setCarregando(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { premium: true });
      setAtivado(true);
    } catch (e) {
      setErro('Erro ao ativar premium.');
    } finally {
      setCarregando(false);
    }
  };

  if (ativado) {
    return (
      <div className="p-4 rounded-xl bg-yellow-100 border border-yellow-400 shadow-md">
        <h2 className="text-xl font-bold text-yellow-800">Plano Premium Ativado!</h2>
        <p className="text-sm mt-2">Obrigado por apoiares esta aventura. Já tens acesso a todos os benefícios!</p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">🚀 Vantagens do Plano Premium</h2>
      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>Desbloqueio de todos os guias digitais</li>
        <li>15% de desconto nas reservas simuladas</li>
        <li>Acesso prioritário a promoções exclusivas</li>
        <li>Sugestões de viagem personalizadas com IA Premium</li>
        <li>Selo "Premium" visível no perfil</li>
      </ul>

      {erro && <p className="text-red-600 mt-3">{erro}</p>}

      <button
        onClick={ativarPremium}
        disabled={carregando}
        className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl font-semibold"
      >
        {carregando ? 'A ativar...' : 'Ativar Premium por 3,99€/mês'}
      </button>
    </div>
  );
};

export default PlanoPremium;

