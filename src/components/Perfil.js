import React from "react";
import { useAuth } from "../context/AuthContext";

function Perfil() {
  const { currentUser, saldo } = useAuth();

  const handleAdicionarSaldo = async () => {
    const valor = prompt("Quanto queres adicionar? (ex: 20)");
    const valorNum = Number(valor);
    if (!valorNum || valorNum <= 0) {
      alert("Valor inválido");
      return;
    }

    try {
      const res = await fetch("https://us-central1-dreamtripsaving-e777e.cloudfunctions.net/createStripeCheckoutSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: currentUser.uid,
          valor: valorNum,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erro ao iniciar pagamento.");
      }
    } catch (err) {
      alert("Erro ao conectar ao Stripe.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Perfil</h2>
        <div className="mb-4">
          <span className="block font-semibold">Email:</span>
          <span>{currentUser.email}</span>
        </div>
        <div className="mb-4">
          <span className="block font-semibold">Saldo:</span>
          <span>{Number(saldo).toFixed(2)} €</span>
        </div>
        <button
          onClick={handleAdicionarSaldo}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Adicionar saldo
        </button>
      </div>
    </div>
  );
}

export default Perfil;
