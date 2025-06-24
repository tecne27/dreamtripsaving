import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function AdminSugestoes({ onBack }) {
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nova, setNova] = useState({
    nome: "",
    descricao: "",
    destino: "",
    tipo: "",
    imagem: "",
    parceiro: "",
    link: "",
    preco: "",
    tags: "",
  });
  const [editId, setEditId] = useState(null);
  const [editSugestao, setEditSugestao] = useState({ ...nova });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "sugestoes"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setSugestoes(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleChangeNova = e => setNova({ ...nova, [e.target.name]: e.target.value });
  const handleChangeEdit = e => setEditSugestao({ ...editSugestao, [e.target.name]: e.target.value });

  const adicionarSugestao = async () => {
    if (!nova.nome || !nova.imagem) {
      setMensagem("Preenche pelo menos o nome e a imagem.");
      return;
    }
    try {
      const db = getFirestore();
      await addDoc(collection(db, "sugestoes"), {
        ...nova,
        tags: nova.tags ? nova.tags.split(",").map(t => t.trim()) : [],
        tipo: nova.tipo ? nova.tipo.split(",").map(t => t.trim()) : [],
      });
      setNova({ nome: "", descricao: "", destino: "", tipo: "", imagem: "", parceiro: "", link: "", preco: "", tags: "" });
      setMensagem("Sugestão adicionada com sucesso!");
    } catch {
      setMensagem("Erro ao adicionar sugestão.");
    }
  };

  const iniciarEdicao = s => {
    setEditId(s.id);
    setEditSugestao({
      ...s,
      tags: Array.isArray(s.tags) ? s.tags.join(", ") : s.tags || "",
      tipo: Array.isArray(s.tipo) ? s.tipo.join(", ") : s.tipo || "",
    });
    setMensagem("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEditSugestao({ ...nova });
    setMensagem("");
  };

  const guardarEdicao = async () => {
    if (!editSugestao.nome || !editSugestao.imagem) {
      setMensagem("Preenche pelo menos o nome e a imagem.");
      return;
    }
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "sugestoes", editId), {
        ...editSugestao,
        tags: editSugestao.tags ? editSugestao.tags.split(",").map(t => t.trim()) : [],
        tipo: editSugestao.tipo ? editSugestao.tipo.split(",").map(t => t.trim()) : [],
      });
      cancelarEdicao();
      setMensagem("Sugestão atualizada com sucesso!");
    } catch {
      setMensagem("Erro ao guardar alterações.");
    }
  };

  const eliminarSugestao = async id => {
    if (!window.confirm("Eliminar esta sugestão?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "sugestoes", id));
      setMensagem("Sugestão eliminada com sucesso!");
    } catch {
      setMensagem("Erro ao eliminar sugestão.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Gestão de Sugestões</h2>
      {mensagem && <div className="mb-4 text-blue-700 font-semibold">{mensagem}</div>}

      {loading ? (
        <div>A carregar...</div>
      ) : (
        <>
          <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Nome</th>
                <th className="px-4 py-2 border-b">Descrição</th>
                <th className="px-4 py-2 border-b">Imagem</th>
                <th className="px-4 py-2 border-b">Link</th>
                <th className="px-4 py-2 border-b">Preço</th>
                <th className="px-4 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sugestoes.map(s => (
                <tr key={s.id}>
                  {editId === s.id ? (
                    <>
                      <td className="border-b"><input className="w-full" name="nome" value={editSugestao.nome} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input className="w-full" name="descricao" value={editSugestao.descricao} onChange={handleChangeEdit} /></td>
                      <td className="border-b">
                        <input className="w-full" name="imagem" value={editSugestao.imagem} onChange={handleChangeEdit} />
                        {editSugestao.imagem && (
                          <img src={editSugestao.imagem} alt="" className="h-10 mt-1 rounded shadow border" />
                        )}
                      </td>
                      <td className="border-b"><input className="w-full" name="link" value={editSugestao.link} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input className="w-full" name="preco" value={editSugestao.preco} onChange={handleChangeEdit} /></td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-green-600 text-white px-3 py-1 mr-2 rounded" onClick={guardarEdicao}>Guardar</button>
                        <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={cancelarEdicao}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b">{s.nome}</td>
                      <td className="border-b max-w-xs truncate">{s.descricao}</td>
                      <td className="border-b max-w-xs truncate">
                        {s.imagem && (
                          <img src={s.imagem} alt="" className="h-10 rounded shadow border" />
                        )}
                      </td>
                      <td className="border-b max-w-xs truncate">{s.link}</td>
                      <td className="border-b">{s.preco}</td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-yellow-400 text-xs px-3 py-1 mr-2 rounded" onClick={() => iniciarEdicao(s)}>Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminarSugestao(s.id)}>Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border p-4 rounded shadow bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">Adicionar Nova Sugestão</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="nome" placeholder="Nome" value={nova.nome} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="descricao" placeholder="Descrição" value={nova.descricao} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="imagem" placeholder="URL da Imagem" value={nova.imagem} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="link" placeholder="Link" value={nova.link} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="preco" placeholder="Preço" value={nova.preco} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="destino" placeholder="Destino" value={nova.destino} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="tipo" placeholder="Tipo (ex: aventura, praia... separado por vírgula)" value={nova.tipo} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="parceiro" placeholder="Parceiro" value={nova.parceiro} onChange={handleChangeNova} className="border p-2 rounded" />
              <input name="tags" placeholder="Tags (separadas por vírgula)" value={nova.tags} onChange={handleChangeNova} className="border p-2 rounded" />
            </div>
            {nova.imagem && (
              <img src={nova.imagem} alt="" className="h-14 mt-2 rounded shadow border" />
            )}
            <button onClick={adicionarSugestao} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Adicionar Sugestão</button>
          </div>
        </>
      )}
    </div>
  );
}
