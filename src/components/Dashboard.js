import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Banners from "./Banners";

// Mini loja do influencer (CRUD 100% modular)
function MiniLojaInfluencer({ codigoInfluencer, email }) {
  const [produtos, setProdutos] = useState([]);
  const [novo, setNovo] = useState({ nome: "", preco: "", descricao: "", imagem: "", link: "" });
  const [editingId, setEditingId] = useState(null);
  const [editProduto, setEditProduto] = useState({});

  useEffect(() => {
    if (!codigoInfluencer) return;
    const db = getFirestore();
    const q = query(collection(db, "produtosInfluencer"), where("codigoInfluencer", "==", codigoInfluencer));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setProdutos(arr);
    });
    return () => unsub && unsub();
  }, [codigoInfluencer]);

  const adicionar = async () => {
    if (!novo.nome || !novo.preco || !novo.imagem) return;
    const db = getFirestore();
    await addDoc(collection(db, "produtosInfluencer"), {
      ...novo,
      preco: parseFloat(novo.preco),
      codigoInfluencer,
      email
    });
    setNovo({ nome: "", preco: "", descricao: "", imagem: "", link: "" });
  };

  const eliminar = async (id) => {
    if (!window.confirm("Eliminar este produto?")) return;
    const db = getFirestore();
    await deleteDoc(doc(db, "produtosInfluencer", id));
  };

  const iniciarEditar = (prod) => {
    setEditingId(prod.id);
    setEditProduto(prod);
  };

  const guardarEdicao = async () => {
    const db = getFirestore();
    await updateDoc(doc(db, "produtosInfluencer", editingId), editProduto);
    setEditingId(null);
    setEditProduto({});
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 my-8">
      <h2 className="text-2xl font-bold mb-4 text-fuchsia-700">Minha Loja de Produtos</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 items-end">
        <input className="p-2 rounded border" placeholder="Nome" value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} />
        <input className="p-2 rounded border" placeholder="Preço (€)" type="number" value={novo.preco} onChange={e => setNovo({ ...novo, preco: e.target.value })} />
        <input className="p-2 rounded border" placeholder="Descrição" value={novo.descricao} onChange={e => setNovo({ ...novo, descricao: e.target.value })} />
        <input className="p-2 rounded border" placeholder="Link de compra" value={novo.link} onChange={e => setNovo({ ...novo, link: e.target.value })} />
        <input className="p-2 rounded border" placeholder="Imagem (URL)" value={novo.imagem} onChange={e => setNovo({ ...novo, imagem: e.target.value })} />
        <button className="bg-fuchsia-700 text-white rounded px-4 py-2 hover:bg-fuchsia-900" onClick={adicionar}>
          Adicionar produto
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map(prod => (
          <div key={prod.id} className="border rounded-lg shadow p-4 flex flex-col bg-gray-50 relative">
            {editingId === prod.id ? (
              <>
                <input className="mb-2 p-2 border rounded" value={editProduto.nome} onChange={e => setEditProduto({ ...editProduto, nome: e.target.value })} />
                <input className="mb-2 p-2 border rounded" value={editProduto.preco} onChange={e => setEditProduto({ ...editProduto, preco: e.target.value })} />
                <input className="mb-2 p-2 border rounded" value={editProduto.descricao} onChange={e => setEditProduto({ ...editProduto, descricao: e.target.value })} />
                <input className="mb-2 p-2 border rounded" value={editProduto.link} onChange={e => setEditProduto({ ...editProduto, link: e.target.value })} />
                <input className="mb-2 p-2 border rounded" value={editProduto.imagem} onChange={e => setEditProduto({ ...editProduto, imagem: e.target.value })} />
                <button className="bg-green-700 text-white px-3 py-1 rounded mr-2" onClick={guardarEdicao}>Guardar</button>
                <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <img src={prod.imagem} alt="" className="rounded-lg mb-2 object-cover" style={{ width: "100%", height: 130 }} />
                <h3 className="text-lg font-bold">{prod.nome}</h3>
                <div className="text-fuchsia-700 font-bold mb-2">{prod.preco} €</div>
                <div className="mb-2 text-sm">{prod.descricao}</div>
                {prod.link && (
                  <a className="mb-2 text-blue-600 underline" href={prod.link} target="_blank" rel="noopener noreferrer">Ver Produto</a>
                )}
                <div className="mt-2 flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded" onClick={() => iniciarEditar(prod)}>Editar</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminar(prod.id)}>Eliminar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedSaldo({ saldo }) {
  const [displaySaldo, setDisplaySaldo] = useState(saldo || 0);
  useEffect(() => {
    let frame;
    let start = displaySaldo;
    let end = saldo;
    let duration = 500;
    let startTime;
    function animateSaldo(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = start + (end - start) * progress;
      setDisplaySaldo(Number(value.toFixed(2)));
      if (progress < 1) {
        frame = requestAnimationFrame(animateSaldo);
      }
    }
    if (end !== start) {
      frame = requestAnimationFrame(animateSaldo);
    }
    return () => frame && cancelAnimationFrame(frame);
  }, [saldo]);
  return (
    <div className="font-bold text-xl text-green-700 bg-green-100 px-5 py-2 rounded-full shadow">
      Saldo: {displaySaldo.toFixed(2)} €
    </div>
  );
}

export default function Dashboard() {
  const { saldo, currentUser } = useAuth() || {};
  const [mostrarLoja, setMostrarLoja] = useState(false);

  // Lê dados completos do utilizador (sempre atualizado do Firestore)
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (!currentUser) {
      setUserData(null);
      return;
    }
    const db = getFirestore();
    const ref = doc(db, "users", currentUser.uid);
    const unsub = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setUserData(null);
      }
    });
    return () => unsub();
  }, [currentUser]);

  // Dados Firestore para destinos, pacotes, sugestões
  const [destinos, setDestinos] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubDest = onSnapshot(collection(db, "destinos"), snap => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setDestinos(arr);
    });
    const unsubPacotes = onSnapshot(collection(db, "pacotesViagem"), snap => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setPacotes(arr);
    });
    const unsubSug = onSnapshot(collection(db, "sugestoes"), snap => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setSugestoes(arr);
    });
    return () => {
      unsubDest();
      unsubPacotes();
      unsubSug();
    };
  }, []);

  const todosDestinos = Array.isArray(destinos) && Array.isArray(pacotes)
    ? [...destinos, ...pacotes]
    : [];

  const categorias = [
    "Todos",
    ...Array.from(
      new Set(
        (todosDestinos || [])
          .map((d) => d && d.categoria)
          .filter((c) => !!c)
          .flatMap((c) =>
            Array.isArray(c)
              ? c
              : typeof c === "string"
              ? [c]
              : []
          )
      )
    ),
  ];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const destinosFiltrados =
    categoriaSelecionada === "Todos"
      ? todosDestinos
      : todosDestinos.filter(
          (d) =>
            (Array.isArray(d.categoria)
              ? d.categoria.includes(categoriaSelecionada)
              : d.categoria === categoriaSelecionada)
        );

  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  useEffect(() => {
    if (!termoPesquisa) {
      setResultadosPesquisa([]);
      return;
    }
    const termo = termoPesquisa.toLowerCase();
    const filtrados = (todosDestinos || []).filter(
      (dest) =>
        (dest.nome && dest.nome.toLowerCase().includes(termo)) ||
        (dest.pais && dest.pais.toLowerCase().includes(termo)) ||
        (dest.tipo && Array.isArray(dest.tipo) && dest.tipo.some((cat) => cat.toLowerCase().includes(termo))) ||
        (dest.categoria && (
          Array.isArray(dest.categoria)
            ? dest.categoria.some((cat) => cat.toLowerCase().includes(termo))
            : typeof dest.categoria === "string" && dest.categoria.toLowerCase().includes(termo)
        ))
    );
    setResultadosPesquisa(filtrados);
  }, [termoPesquisa, todosDestinos]);

  const carrosselRef = useRef();
  const scrollCarrossel = (offset) => {
    if (carrosselRef.current) {
      carrosselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Mostra o botão para influencers se tem role e código influencer
  const isInfluencer = userData && userData.role === "influencer" && userData.codigoInfluencer;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100" style={{ paddingLeft: 80 }}>
      <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm sticky top-0 z-20">
        <span className="text-xl font-extrabold text-blue-700">DreamTripSavings</span>
        <AnimatedSaldo saldo={saldo} />
      </div>

      <Banners />

      {isInfluencer && (
        <div className="max-w-7xl mx-auto mt-4 mb-8 flex justify-end">
          <button
            className="bg-fuchsia-600 hover:bg-fuchsia-800 text-white px-6 py-3 rounded-xl font-bold shadow transition"
            onClick={() => setMostrarLoja((m) => !m)}
          >
            {mostrarLoja ? "Fechar Gestão da Minha Loja" : "Gerir minha loja"}
          </button>
        </div>
      )}

      {isInfluencer && mostrarLoja && (
        <MiniLojaInfluencer codigoInfluencer={userData.codigoInfluencer} email={userData.email} />
      )}

      <div className="max-w-2xl mx-auto mt-6">
        <input
          type="text"
          placeholder="Pesquisar destinos ou pacotes..."
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200 focus:outline-blue-600 shadow"
        />
      </div>

      <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center mt-7 mb-5">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelecionada(cat)}
            className={`px-5 py-2 rounded-full font-bold shadow transition border ${categoriaSelecionada === cat ? "bg-blue-700 text-white" : "bg-white text-blue-700 hover:bg-blue-100"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {resultadosPesquisa.length > 0 && (
          <motion.div
            className="max-w-6xl mx-auto p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-bold my-4">Resultados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resultadosPesquisa.map((dest, i) => (
                <CardDestino key={dest.id || dest.nome + i} destino={dest} idx={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-blue-700">
            {categoriaSelecionada === "Todos"
              ? "Explorar destinos e pacotes"
              : `Explorar categoria: ${categoriaSelecionada}`}
          </h2>
          <div className="flex gap-2">
            <button
              className="bg-blue-200 text-blue-700 rounded-full p-2 hover:bg-blue-300 transition"
              onClick={() => scrollCarrossel(-350)}
              aria-label="Scroll esquerda"
            >
              ◀
            </button>
            <button
              className="bg-blue-200 text-blue-700 rounded-full p-2 hover:bg-blue-300 transition"
              onClick={() => scrollCarrossel(350)}
              aria-label="Scroll direita"
            >
              ▶
            </button>
          </div>
        </div>
        <motion.div
          ref={carrosselRef}
          className="flex gap-6 overflow-x-auto scrollbar-thin pb-4"
          style={{ scrollSnapType: "x mandatory" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {(destinosFiltrados || []).map((dest, i) => (
            <motion.div
              key={dest.id || dest.nome + i}
              style={{ minWidth: 300, scrollSnapAlign: "start" }}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i, duration: 0.45, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <CardDestino destino={dest} idx={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-14">
        {(sugestoes || []).map((s, i) => (
          <motion.div
            key={(s.nome || s.titulo || "sugestao") + i}
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.01 * i, duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{s.nome || s.titulo}</h2>
            <p className="mb-2">{s.descricao}</p>
            {s.parceiro && s.link && (
              <div className="mb-4">
                <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded mr-2">
                  Parceiro: {s.parceiro}
                </span>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline ml-2"
                >
                  Ver oferta
                </a>
              </div>
            )}
            {s.imagem && (
              <img
                src={s.imagem}
                alt={s.nome}
                className="rounded-xl mb-3 w-full max-w-md"
                style={{ maxHeight: 240, objectFit: "cover" }}
              />
            )}
            {s.tipo && (
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.isArray(s.tipo) ? s.tipo.map((tag, j) => (
                  <span
                    key={tag + j}
                    className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs"
                  >
                    #{tag}
                  </span>
                )) : null}
              </div>
            )}
            {s.preco && (
              <div className="mb-4">
                <span className="text-blue-700 font-semibold">{s.preco}</span>
              </div>
            )}
            {s.link && (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition mt-3"
              >
                Reservar agora
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CardDestino({ destino, idx }) {
  const urlImg =
    destino.imagem && destino.imagem.startsWith("http")
      ? destino.imagem
      : Array.isArray(destino.imagens) && destino.imagens[0]
        ? destino.imagens[0]
        : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

  const preco =
    destino.precoDreamTripSavings
      ? `Desde ${destino.precoDreamTripSavings}€ (Poupa ${destino.poupanca || 0}€)`
      : destino.preco || "";

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer group"
      style={{ minHeight: 350, maxWidth: 320 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08, boxShadow: "0px 10px 24px 2px rgba(30,64,175,0.14)" }}
      transition={{ delay: 0.03 * idx, duration: 0.4, type: "spring" }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={urlImg}
          alt={destino.nome}
          className="h-48 w-full object-cover group-hover:brightness-90 transition"
          loading="lazy"
          whileHover={{ scale: 1.04 }}
        />
        {destino.pais && (
          <span className="absolute top-3 right-3 bg-white/90 text-blue-700 font-bold rounded px-2 py-1 text-xs shadow">
            {destino.pais}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-1">{destino.nome}</h3>
        {preco && (
          <span className="text-sm text-blue-700 font-semibold mb-2">
            {preco}
          </span>
        )}
        <p className="mb-2 text-gray-700 text-sm flex-1">{destino.descricao}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {Array.isArray(destino.tipo) && destino.tipo.map((tag, i) => (
            <span
              key={tag + i}
              className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        {destino.linkCompra || destino.link ? (
          <a
            href={destino.linkCompra || destino.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition w-fit self-end"
            style={{ marginTop: "auto" }}
          >
            Reservar agora
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}
