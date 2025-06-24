// Sug// GuiasLoja.js — loja interativa de guias com desbloqueio por pontos
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

const GuiasLoja = () => {
  const { currentUser } = useAuth();
  const [guias, setGuias] = useState([]);
  const [pontos, setPontos] = useState(0);
  const [userIdDoc, setUserIdDoc] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchGuias = async () => {
      const guiasSnap = await getDocs(collection(db, 'guias'));
      const lista = [];
      guiasSnap.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      setGuias(lista);
    };

    const fetchUser = async () => {
      const userSnap = await getDocs(collection(db, 'users'));
      userSnap.forEach((docSnap) => {
        if (docSnap.data().uid === currentUser?.uid) {
          setUserIdDoc(docSnap.id);
          setPontos(docSnap.data().pontos || 0);
        }
      });
    };

    fetchGuias();
    fetchUser();
  }, [currentUser]);

  const desbloquearGuia = async (guia) => {
    if (pontos < guia.pontos) {
      setMensagem('❌ Pontos insuficientes para desbloquear este guia.');
      setTimeout(() => setMensagem(''), 4000);
      return;
    }

    await updateDoc(doc(db, 'users', userIdDoc), {
      pontos: pontos - guia.pontos,
      [`guia_${guia.id}`]: true,
    });

    setPontos(pontos - guia.pontos);
    setMensagem(`✅ Guia de ${guia.titulo} desbloqueado!`);
    setTimeout(() => setMensagem(''), 4000);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Loja de Guias Digitais</h2>
      {mensagem && <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{mensagem}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {guias.map((guia) => (
          <div key={guia.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{guia.titulo}</h3>
            <p className="text-gray-600 text-sm mb-2">{guia.descricao}</p>
            <p className="text-purple-600 font-medium mb-2">Custo: {guia.pontos} pontos</p>
            <button
              onClick={() => desbloquearGuia(guia)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Desbloquear
            </button>
            {guia.pdfUrl && (
              <a
                href={guia.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-blue-500 underline"
              >
                Pré-visualizar Guia
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuiasLoja;


