import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export default function HistoricoDepositos() {
  const [registos, setRegistos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepositos = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'depositos'),
        where('uid', '==', user.uid),
        orderBy('data', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map(doc => doc.data());
      setRegistos(lista);
      setLoading(false);
    };

    fetchDepositos();
  }, []);

  if (loading) return <p>A carregar histórico...</p>;
  if (registos.length === 0) return <p>Sem depósitos registados ainda.</p>;

  return (
    <div style={{ padding: 20, marginTop: 30, border: '1px solid #ccc', borderRadius: 10 }}>
      <h3>📜 Histórico de Depósitos</h3>
      <ul>
        {registos.map((item, index) => (
          <li key={index}>
            {new Date(item.data.seconds * 1000).toLocaleString('pt-PT')} — {item.valor.toFixed(2)}€
          </li>
        ))}
      </ul>
    </div>
  );
}
