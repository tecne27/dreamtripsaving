import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

export default function AdminLojas({ onBack }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoProduto, setNovoProduto] = useState({ nome: "", descricao: "", preco: "", link: "", imagem: "" });
  const [editId, setEditId] = useState(null);
  const [editProduto, setEditProduto] = useState({ nome: "", descricao: "", preco: "", link: "", imagem: "" });
  const [mensagem, setMensagem] = useState("");

  // Atualização em tempo real
  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "produtosLoja"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setProdutos(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleChangeNovo = e => setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  const handleChangeEdit = e => setEditProduto({ ...editProduto, [e.target.name]: e.target.value });

  const adicionarProduto = async () => {
    if (!novoProduto.nome || !novoProduto.imagem) {
      setMensagem("Preenche pelo menos o nome e a imagem.");
      return;
    }
    try {
      const db = getFirestore();
      await addDoc(collection(db, "produtosLoja"), novoProduto);
      setNovoProduto({ nome: "", descricao: "", preco: "", link: "", imagem: "" });
      setMensagem("Produto adicionado com sucesso!");
    } catch {
      setMensagem("Erro ao adicionar produto.");
    }
  };

  const iniciarEdicao = produto => {
    setEditId(produto.id);
    setEditProduto(produto);
    setMensagem("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEditProduto({ nome: "", descricao: "", preco: "", link: "", imagem: "" });
    setMensagem("");
  };

  const guardarEdicao = async () => {
    if (!editProduto.nome || !editProduto.imagem) {
      setMensagem("Preenche pelo menos o nome e a imagem.");
      return;
    }
    try {
      const db = getFirestore();
      const docRef = doc(db, "produtosLoja", editId);
      await updateDoc(docRef, editProduto);
      cancelarEdicao();
      setMensagem("Produto atualizado com sucesso!");
    } catch {
      setMensagem("Erro ao guardar alterações.");
    }
  };

  const eliminarProduto = async id => {
    if (!window.confirm("Eliminar este produto?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "produtosLoja", id));
      setMensagem("Produto eliminado com sucesso!");
    } catch {
      setMensagem("Erro ao eliminar produto.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-3xl font-bold text-green-700 mb-6">Gestão da Loja</h2>
      {mensagem && <div className="mb-4 text-sm font-semibold text-blue-700">{mensagem}</div>}

      {loading ? (
        <div>A carregar...</div>
      ) : (
        <>
          <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Nome</th>
                <th className="px-4 py-2 border-b">Descrição</th>
                <th className="px-4 py-2 border-b">Preço</th>
                <th className="px-4 py-2 border-b">Link</th>
                <th className="px-4 py-2 border-b">Imagem</th>
                <th className="px-4 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(p => (
                <tr key={p.id}>
                  {editId === p.id ? (
                    <>
                      <td className="border-b"><input className="w-full" name="nome" value={editProduto.nome} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input className="w-full" name="descricao" value={editProduto.descricao} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input className="w-full" name="preco" value={editProduto.preco} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input className="w-full" name="link" value={editProduto.link} onChange={handleChangeEdit} /></td>
                      <td className="border-b">
                        <input className="w-full" name="imagem" value={editProduto.imagem} onChange={handleChangeEdit} />
                        {editProduto.imagem && (
                          <img src={editProduto.imagem} alt="" className="h-12 mt-1 rounded shadow border" />
                        )}
                      </td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-green-600 text-white px-3 py-1 mr-2 rounded" onClick={guardarEdicao}>Guardar</button>
                        <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={cancelarEdicao}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b">{p.nome}</td>
                      <td className="border-b max-w-xs truncate">{p.descricao}</td>
                      <td className="border-b">{p.preco}</td>
                      <td className="border-b max-w-xs truncate">{p.link}</td>
                      <td className="border-b max-w-xs truncate">
                        {p.imagem && (
                          <img src={p.imagem} alt="" className="h-12 rounded shadow border" />
                        )}
                      </td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-yellow-400 text-xs px-3 py-1 mr-2 rounded" onClick={() => iniciarEdicao(p)}>Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminarProduto(p.id)}>Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border p-4 rounded shadow bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">Adicionar Novo Produto</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="nome" placeholder="Nome" value={novoProduto.nome} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="descricao" placeholder="Descrição" value={novoProduto.descricao} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="preco" placeholder="Preço" value={novoProduto.preco} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="link" placeholder="Link" value={novoProduto.link} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="imagem" placeholder="URL da Imagem" value={novoProduto.imagem} onChange={handleChangeNovo} className="border p-2 rounded" />
            </div>
            {novoProduto.imagem && (
              <img src={novoProduto.imagem} alt="" className="h-16 mt-2 rounded shadow border" />
            )}
            <button onClick={adicionarProduto} className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Adicionar Produto</button>
          </div>
        </>
      )}
    </div>
  );
}
