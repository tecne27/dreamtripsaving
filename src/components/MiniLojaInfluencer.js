import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

export default function MiniLojaInfluencer({ codigoInfluencer, email }) {
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
    return () => unsub();
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

