import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export default function DefinirObjetivo() {
  const [destino, setDestino] = useState('');
  const [meta, setMeta] = useState('');

  const guardarObjetivo = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        objetivo: {
          destino,
          meta: parseFloat(meta),
          poupado: 0
        }
      });
      alert('Objetivo de viagem definido com sucesso!');
      setDestino('');
      setMeta('');
    } catch (error) {
      alert('Erro ao guardar objetivo: ' + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Definir destino de sonho</h3>
      <form onSubmit={guardarObjetivo}>
        <input
          type="text"
          placeholder="Destino (ex: Roma)"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          required
        /><br />
        <input
          type="number"
          placeholder="Meta em euros (ex: 600)"
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
          required
        /><br />
        <button type="submit">Guardar objetivo</button>
      </form>
    </div>
  );
}
