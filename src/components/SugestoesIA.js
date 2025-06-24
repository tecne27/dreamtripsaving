import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

const SugestoesIA = ({ filtro, saldo, premium, pontos }) => {
  const { currentUser } = useAuth();
  const [sugestoes, setSugestoes] = useState([]);
  const [userDocId, setUserDocId] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchSugestoes = async () => {
      try {
        const snap = await getDocs(collection(db, 'sugestoesIA'));
        const lista = [];
        snap.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
        setSugestoes(lista);
      } catch (error) {}
    };

    const fetchUserId = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        snap.forEach((docSnap) => {
          if (docSnap.data().uid === currentUser?.uid) {
            setUserDocId(docSnap.id);
          }
        });
      } catch (error) {}
    };

    if (currentUser) {
      fetchSugestoes();
      fetchUserId();
    }
  }, [currentUser]);

  const reservar = async (viagem) => {
    if (!userDocId) return;
    const precoViagem = typeof viagem.preco === 'number' ? viagem.preco : parseFloat(viagem.preco) || 0;
    const valor = premium ? precoViagem * 0.3 : precoViagem;
    if (saldo < valor) {
      setMensagem('❌ Saldo insuficiente.');
      setTimeout(() => setMensagem(''), 3000);
      return;
    }
    try {
      const userRef = doc(db, 'users', userDocId);
      await updateDoc(userRef, {
        saldo: saldo - valor,
        pontos: (pontos || 0) + 100,
      });
      setMensagem(`✅ Reserva efetuada para ${viagem.destino}! Ganhaste 100 pontos.`);
      setTimeout(() => setMensagem(''), 4000);
    } catch (error) {}
  };

  const sugestoesFiltradas = sugestoes.filter((item) => {
    const filtroLower = filtro?.toLowerCase() || '';
    const destinoMatch = item.destino?.toLowerCase().includes(filtroLower);
    const tipoMatch = item.tipo?.toLowerCase().includes(filtroLower);
    const matchTexto = filtro ? destinoMatch || tipoMatch : true;
    const precoNumero = typeof item.preco === 'number' ? item.preco : parseFloat(item.preco) || 0;
    const matchSaldo = precoNumero <= saldo || saldo === 0;
    return matchTexto && matchSaldo;
  });

  const categorias = Array.from(new Set(sugestoesFiltradas.map((v) => v.tipo))).filter(Boolean);

  return (
    <div>
      {mensagem && <div className="text-center bg-green-100 text-green-700 p-2 rounded mb-4">{mensagem}</div>}

      {categorias.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          Nenhuma sugestão encontrada. Tenta adicionar saldo ou usar outro filtro.
        </div>
      )}

      {categorias.map((categoria) => {
        const viagensCategoria = sugestoesFiltradas.filter((v) => v.tipo === categoria);
        return (
          <div key={categoria} className="mb-10">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">{categoria}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {viagensCategoria.map((v) => (
                <div key={v.id} className="bg-white rounded-lg shadow-md p-4">
                  {v.imagens && Array.isArray(v.imagens) && v.imagens.length > 0 ? (
                    <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
                      {v.imagens.map((url, i) => (
                        <div key={i}>
                          <img src={url} alt={`Imagem ${i + 1}`} className="rounded h-48 object-cover w-full" />
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">Sem imagens</span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mt-2">{v.destino || 'Sem destino'}</h3>
                  <p className="text-sm text-gray-600">{v.descricao || 'Sem descrição disponível'}</p>
                  <p className="text-green-600 font-bold mt-1">
                    {v.preco ? `${typeof v.preco === 'number' ? v.preco.toFixed(2) : v.preco}€` : 'Preço não disponível'}
                  </p>
                  {v.link && (
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      Ver mais
                    </a>
                  )}
                  <button
                    onClick={() => reservar(v)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                  >
                    Reservar
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SugestoesIA;
