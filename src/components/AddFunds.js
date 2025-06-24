import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Agora a chave é lida do .env para produção segura!
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function AddFunds({ onSaldoAtualizado }) {
  const [customValue, setCustomValue] = useState('');
  const [metodo, setMetodo] = useState('MBWay');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const iniciarCheckoutStripe = async (amount) => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      alert('Tens de estar autenticado para adicionar saldo.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        'https://us-central1-dreamtripsaving-e777e.cloudfunctions.net/createStripeCheckoutSession',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, uid: user.uid }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro do servidor:', errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      alert('Erro ao criar pagamento. Tenta novamente.');
      console.error(err);
    }

    setLoading(false);
  };

  const handleQuickAdd = (amount) => {
    iniciarCheckoutStripe(amount);
  };

  const handleCustomAdd = (e) => {
    e.preventDefault();
    const amount = parseFloat(customValue);
    if (isNaN(amount) || amount <= 0) {
      alert('Insere um valor válido.');
      return;
    }
    iniciarCheckoutStripe(amount);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">💳 Adicionar Saldo</h2>

      {/* AVISO DE DINHEIRO REAL */}
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-4 text-sm font-medium border-l-4 border-yellow-500">
        Atenção: O saldo carregado será debitado em dinheiro real, através do Stripe. Este valor não é reembolsável. Confirme sempre antes de submeter!
      </div>

      <div className="flex gap-2 justify-center mb-4">
        <button disabled={loading} onClick={() => handleQuickAdd(5)} className="bg-blue-500 text-white px-4 py-2 rounded">+5€</button>
        <button disabled={loading} onClick={() => handleQuickAdd(10)} className="bg-blue-500 text-white px-4 py-2 rounded">+10€</button>
        <button disabled={loading} onClick={() => handleQuickAdd(20)} className="bg-blue-500 text-white px-4 py-2 rounded">+20€</button>
      </div>
      <form onSubmit={handleCustomAdd} className="space-y-4">
        <input
          type="number"
          step="0.01"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Outro valor"
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        />
        <select
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        >
          <option value="MBWay">MBWay</option>
          <option value="CartaoCredito">Cartão de Crédito</option>
          <option value="Paypal">Paypal</option>
        </select>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? 'A processar...' : 'Adicionar'}
          </button>
          <button
            type="button"
            className="text-red-500 underline"
            onClick={() => navigate('/dashboard')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
