// UpgradePremium.js — Corrigido para não causar logout e redirecionamento
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const UpgradePremium = ({ uid, saldo, docId }) => {
  const [mensagem, setMensagem] = useState('');

  const precoMensal = 3.99;

  const ativarPremium = async () => {
    if (saldo < precoMensal) {
      setMensagem('Saldo insuficiente para ativar a versão Premium.');
      return;
    }

    try {
      const userRef = doc(db, 'users', docId);
      await updateDoc(userRef, {
        saldo: saldo - precoMensal,
        premium: true,
      });
      setMensagem('Parabéns! A tua conta Premium está ativa! ✨');
    } catch (error) {
      console.error('Erro ao ativar Premium:', error);
      setMensagem('Ocorreu um erro ao tentar ativar o plano.');
    }
  };

  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded p-4 my-6">
      <h2 className="text-lg font-bold mb-2">🌟 Conta Premium</h2>
      <p className="text-sm text-gray-700 mb-2">
        Ativa por apenas <strong>{precoMensal.toFixed(2)}€</strong>/mês e desbloqueia guias, descontos, e IA avançada.
      </p>
      <button
        onClick={ativarPremium}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Ativar Premium
      </button>
      {mensagem && <p className="text-green-700 mt-3 font-semibold">{mensagem}</p>}
    </div>
  );
};

export default UpgradePremium;


