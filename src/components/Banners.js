import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, addDoc, getDocs } from "firebase/firestore";

const BANNER_EXEMPLO = {
  titulo: "Promo Verão 2025",
  subtitulo: "Viaja mais, poupa mais. Aproveita descontos exclusivos este verão!",
  imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  link: "https://teusite.pt/ofertas",
  corFundo: "from-blue-500 to-indigo-600",
  posicao: "topo",
  ordem: 1,
  ativo: true,
};

export default function Banners({ posicao = null }) {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const bannersCol = collection(db, "banners");

    // Primeira execução: garante que existe pelo menos 1 banner na coleção
    getDocs(bannersCol).then(snapshot => {
      if (snapshot.empty) {
        addDoc(bannersCol, BANNER_EXEMPLO);
      }
    });

    // Subscrição para mostrar banners em tempo real
    const unsub = onSnapshot(bannersCol, (snap) => {
      let arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      arr = arr.filter(b => b.ativo !== false);
      if (posicao !== null) arr = arr.filter(b => b.posicao === posicao);
      arr.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
      setBanners(arr);
    });
    return () => unsub();
  }, [posicao]);
  if (!banners.length) return null;
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 justify-center items-center py-5">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className={`w-full rounded-2xl shadow-lg bg-gradient-to-r ${banner.corFundo || "from-blue-500 to-indigo-600"} flex items-center p-6`}
        >
          {banner.imagem && (
            <img src={banner.imagem} alt={banner.titulo} className="h-28 rounded-2xl shadow-lg mr-6" />
          )}
          <div className="flex flex-col">
            {banner.titulo && (
              <h1 className="text-3xl font-extrabold text-white mb-1">{banner.titulo}</h1>
            )}
            {banner.subtitulo && (
              <p className="text-white text-lg">{banner.subtitulo}</p>
            )}
            {banner.link && (
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-white text-blue-700 font-bold px-5 py-2 rounded-lg shadow hover:bg-blue-50 transition w-fit"
              >
                Saber mais
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
