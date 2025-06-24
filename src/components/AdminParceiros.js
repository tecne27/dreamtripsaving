import React, { useEffect, useState, useRef } from "react";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function AdminParceiros({ onBack }) {
  const [parceiros, setParceiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novo, setNovo] = useState({ nome: "", url: "", descricao: "", imagem: "", cor: "" });
  const [editId, setEditId] = useState(null);
  const [editParceiro, setEditParceiro] = useState({ ...novo });
  const [mensagem, setMensagem] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "parceiros"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setParceiros(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleFile = (e, modo) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      if (modo === "novo") setNovo({ ...novo, imagem: event.target.result });
      if (modo === "edit") setEditParceiro({ ...editParceiro, imagem: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChangeNovo = e => setNovo({ ...novo, [e.target.name]: e.target.value });
  const handleChangeEdit = e => setEditParceiro({ ...editParceiro, [e.target.name]: e.target.value });

  const adicionarParceiro = async () => {
    if (!novo.nome || !novo.url) {
      setMensagem("Preenche pelo menos o nome e o link.");
      return;
    }
    try {
      const db = getFirestore();
      await addDoc(collection(db, "parceiros"), novo);
      setNovo({ nome: "", url: "", descricao: "", imagem: "", cor: "" });
      setMensagem("Parceiro adicionado!");
    } catch {
      setMensagem("Erro ao adicionar parceiro.");
    }
  };

  const iniciarEdicao = (p) => {
    setEditId(p.id);
    setEditParceiro(p);
    setMensagem("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEditParceiro({ ...novo });
    setMensagem("");
  };

  const guardarEdicao = async () => {
    if (!editParceiro.nome || !editParceiro.url) {
      setMensagem("Preenche pelo menos o nome e o link.");
      return;
    }
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "parceiros", editId), editParceiro);
      cancelarEdicao();
      setMensagem("Alterações guardadas!");
    } catch {
      setMensagem("Erro ao guardar alterações.");
    }
  };

  const eliminarParceiro = async (id) => {
    if (!window.confirm("Eliminar este parceiro?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "parceiros", id));
      setMensagem("Parceiro eliminado!");
    } catch {
      setMensagem("Erro ao eliminar parceiro.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Gestão de Parceiros/Afiliados</h2>
      {mensagem && <div className="mb-4 text-blue-700 font-semibold">{mensagem}</div>}
      {loading ? (
        <div>A carregar...</div>
      ) : (
        <>
          <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden mb-6">
            <thead>
              <tr>
                <th className="px-2 py-2 border-b">Nome</th>
                <th className="px-2 py-2 border-b">Link</th>
                <th className="px-2 py-2 border-b">Imagem</th>
                <th className="px-2 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {parceiros.map(p => (
                <tr key={p.id}>
                  {editId === p.id ? (
                    <>
                      <td className="border-b"><input className="w-full" name="nome" value={editParceiro.nome} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input className="w-full" name="url" value={editParceiro.url} onChange={handleChangeEdit} /></td>
                      <td className="border-b">
                        <input className="w-full mb-2" name="imagem" value={editParceiro.imagem} onChange={handleChangeEdit} placeholder="URL da imagem ou logo" />
                        <input type="file" accept="image/*" className="w-full mb-2" onChange={e => handleFile(e, "edit")} />
                        {editParceiro.imagem && (
                          <img src={editParceiro.imagem} alt="" className="h-9 mt-1 rounded shadow" />
                        )}
                      </td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={guardarEdicao}>Guardar</button>
                        <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={cancelarEdicao}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b">{p.nome}</td>
                      <td className="border-b">
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{p.url}</a>
                      </td>
                      <td className="border-b">
                        {p.imagem && <img src={p.imagem} alt={p.nome} className="h-9 rounded shadow" />}
                      </td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-yellow-400 text-xs px-3 py-1 mr-2 rounded" onClick={() => iniciarEdicao(p)}>Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminarParceiro(p.id)}>Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border p-4 rounded shadow bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Adicionar Novo Parceiro</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="nome" placeholder="Nome" value={novo.nome} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="url" placeholder="Link" value={novo.url} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="descricao" placeholder="Descrição" value={novo.descricao} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="imagem" placeholder="URL da imagem/logo" value={novo.imagem} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input type="file" accept="image/*" ref={fileInputRef} onChange={e => handleFile(e, "novo")} className="border p-2 rounded" />
              <input name="cor" placeholder="Classe Tailwind (bg-blue-700, opcional)" value={novo.cor} onChange={handleChangeNovo} className="border p-2 rounded" />
            </div>
            {novo.imagem && (
              <img src={novo.imagem} alt="" className="h-10 mt-2 rounded shadow" />
            )}
            <button onClick={adicionarParceiro} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Adicionar Parceiro</button>
          </div>
        </>
      )}
    </div>
  );
}
