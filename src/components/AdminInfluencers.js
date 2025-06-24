import React, { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function AdminInfluencers({ onBack }) {
  const [influencers, setInfluencers] = useState([]);
  const [novo, setNovo] = useState({ nome: "", codigo: "", email: "", ativo: true });
  const [editId, setEditId] = useState(null);
  const [editInf, setEditInf] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "influencers"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setInfluencers(arr);
    });
    return () => unsub();
  }, []);

  const adicionar = async () => {
    if (!novo.nome || !novo.codigo) {
      setMsg("Preenche o nome e código.");
      return;
    }
    try {
      const db = getFirestore();
      await addDoc(collection(db, "influencers"), novo);
      setNovo({ nome: "", codigo: "", email: "", ativo: true });
      setMsg("Influencer criado!");
    } catch {
      setMsg("Erro ao criar influencer.");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("Eliminar este influencer?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "influencers", id));
    } catch {
      setMsg("Erro ao eliminar.");
    }
  };

  const iniciarEdicao = (inf) => {
    setEditId(inf.id);
    setEditInf(inf);
    setMsg("");
  };

  const guardarEdicao = async () => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "influencers", editId), editInf);
      setEditId(null);
      setEditInf({});
      setMsg("Alterações guardadas!");
    } catch {
      setMsg("Erro ao guardar alterações.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Gerir Influencers</h2>
      {msg && <div className="mb-4 text-blue-700 font-semibold">{msg}</div>}
      <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden mb-6">
        <thead>
          <tr>
            <th className="px-2 py-2 border-b">Nome</th>
            <th className="px-2 py-2 border-b">Código</th>
            <th className="px-2 py-2 border-b">Email</th>
            <th className="px-2 py-2 border-b">Ativo</th>
            <th className="px-2 py-2 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {influencers.map(inf => (
            <tr key={inf.id}>
              {editId === inf.id ? (
                <>
                  <td className="border-b"><input className="w-full" value={editInf.nome} onChange={e => setEditInf({ ...editInf, nome: e.target.value })} /></td>
                  <td className="border-b"><input className="w-full" value={editInf.codigo} onChange={e => setEditInf({ ...editInf, codigo: e.target.value })} /></td>
                  <td className="border-b"><input className="w-full" value={editInf.email} onChange={e => setEditInf({ ...editInf, email: e.target.value })} /></td>
                  <td className="border-b text-center"><input type="checkbox" checked={!!editInf.ativo} onChange={e => setEditInf({ ...editInf, ativo: e.target.checked })} /></td>
                  <td className="border-b">
                    <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={guardarEdicao}>Guardar</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border-b">{inf.nome}</td>
                  <td className="border-b">{inf.codigo}</td>
                  <td className="border-b">{inf.email}</td>
                  <td className="border-b text-center">{inf.ativo ? "✔️" : "—"}</td>
                  <td className="border-b">
                    <button className="bg-yellow-400 text-xs px-3 py-1 mr-2 rounded" onClick={() => iniciarEdicao(inf)}>Editar</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminar(inf.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border p-4 rounded shadow bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Adicionar Novo Influencer</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input placeholder="Nome" value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Código único" value={novo.codigo} onChange={e => setNovo({ ...novo, codigo: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Email (opcional)" value={novo.email} onChange={e => setNovo({ ...novo, email: e.target.value })} className="border p-2 rounded" />
          <label className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" checked={!!novo.ativo} onChange={e => setNovo({ ...novo, ativo: e.target.checked })} />
            Ativo
          </label>
        </div>
        <button onClick={adicionar} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Adicionar Influencer</button>
      </div>
    </div>
  );
}
