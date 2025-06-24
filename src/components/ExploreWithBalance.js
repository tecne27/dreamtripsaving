import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function ExploreWithBalance() {
  const [saldo, setSaldo] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);

  useEffect(() => {
    const fetchSaldo = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const dados = docSnap.data();
        setSaldo(dados.saldo || 0);
        gerarSugestoes(dados.saldo || 0);
      }
    };

    fetchSaldo();
  }, []);

  const gerarSugestoes = (valor) => {
    let lista = [];

    if (valor < 10) {
      lista.push("💡 Compra um guia digital e começa a planear a próxima viagem!");
    } else if (valor < 25) {
      lista.push("🚍 Viagem de autocarro até uma cidade próxima.");
      lista.push("🍽️ Almoçar fora + passeio cultural local.");
    } else if (valor < 50) {
      lista.push("🚆 Ida e volta de comboio para outra cidade em Portugal.");
      lista.push("🏞️ Atividade de natureza + refeição regional.");
    } else if (valor < 100) {
      lista.push("✈️ Voo low-cost dentro da Europa (só ida).");
      lista.push("🏨 1 noite num hostel ou hotel económico.");
    } else {
      lista.push("🌍 Ida e volta para uma capital europeia (com promoção).");
      lista.push("🛌 2–3 noites num alojamento confortável.");
      lista.push("🎟️ Entrada em atrações turísticas.");
    }

    setSugestoes(lista);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>O que podes fazer com o teu saldo atual?</h3>
      {saldo === null ? (
        <p>A carregar sugestões...</p>
      ) : (
        <>
          <p>Saldo analisado: {saldo.toFixed(2)}€</p>
          <ul>
            {sugestoes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
