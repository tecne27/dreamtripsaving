import React, { useEffect, useRef, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const categoriasFixas = [
  "Low cost",
  "Luxo",
  "Praias",
  "Aventura",
  "Cidades",
  "Natureza",
  "Gastronomia",
  "Enoturismo",
  "Cultura",
  "Eventos/Festas",
  "Família",
  "Bem-estar",
  "Retiros",
  "Cruzeiro",
  "Roadtrip",
  "Comboio",
  "Autocarro",
  "Avião",
  "Barco",
  "Mochileiro",
  "Ecoturismo",
  "Surf/Ski",
  "Resorts",
  "Hostel",
  "Hotel",
  "Romântico",
  "Solo Travel"
];

function CarrosselAnimado({ destinos, onEscolherDestino, label }) {
  const ref = useRef(null);
  const [parar, setParar] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let interval = null;
    interval = setInterval(() => {
      if (!parar && ref.current) {
        ref.current.scrollLeft += 1;
        if (
          ref.current.scrollLeft >=
          ref.current.scrollWidth - ref.current.clientWidth - 1
        ) {
          ref.current.scrollLeft = 0;
        }
      }
    }, 18);
    return () => clearInterval(interval);
  }, [parar, destinos]);

  return (
    <section className="mb-12">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{label}</h3>
      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollBehavior: "smooth", cursor: "grab" }}
        onMouseEnter={() => setParar(true)}
        onMouseLeave={() => setParar(false)}
      >
        {destinos.map(destino => (
          <div
            key={destino.id}
            className="min-w-[260px] max-w-[260px] bg-white rounded-xl shadow p-4 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-200 flex-shrink-0"
            onClick={() => onEscolherDestino(destino)}
          >
            <img
              src={destino.imagem}
              alt={destino.nome}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">{destino.tipo}</div>
            <h4 className="text-lg font-semibold">{destino.nome}</h4>
            <div className="text-gray-700">{destino.pais}</div>
            <div className="text-blue-600 font-semibold mt-2">{destino.preco}€</div>
            <button
              className="mt-2 w-full bg-green-500 text-white rounded px-2 py-1 text-sm"
              onClick={e => {
                e.stopPropagation();
                setParar(true);
                onEscolherDestino(destino);
              }}
            >
              Reservar agora
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ExplorarViagens({ onEscolherDestino, onBack }) {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "destinos"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setDestinos(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const populares = destinos.filter(d => d.popular);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Explorar Destinos</h2>
      {loading ? (
        <div>A carregar...</div>
      ) : (
        <>
          {populares.length > 0 && (
            <CarrosselAnimado destinos={populares} onEscolherDestino={onEscolherDestino} label="Destinos Populares" />
          )}
          {categoriasFixas.map(categoria => {
            const destinosCat = destinos.filter(
              d => !d.popular && d.categoria && d.categoria.trim().toLowerCase() === categoria.toLowerCase()
            );
            if (!destinosCat.length) return null;
            return (
              <CarrosselAnimado
                key={categoria}
                destinos={destinosCat}
                onEscolherDestino={onEscolherDestino}
                label={categoria}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
