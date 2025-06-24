import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function AdminPromocoes({ onBack }) {
  const [cupoes, setCupoes] = useState([]);
  const [novo, setNovo] = useState({ codigo: "", desconto: "", ativo: true });
  const [mensagem, setMensagem] = useState("");
  const [editId, setEditId] = useState(null);
  const [editCupao, setEditCupao] = useState({ codigo: "", desconto: "", ativo: true });

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "cupoes"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setCupoes(arr);
    });
    return () => unsub();
  }, []);

  const adicionarCupao = async () => {
    if (!novo.codigo || !novo.desconto) {
      setMensagem("Preenche o código e desconto.");
      return;
    }
    try {
      const db = getFirestore();
      await addDoc(collection(db, "cupoes"), novo);
      setNovo({ codigo: "", desconto: "", ativo: true });
      setMensagem("Cupão adicionado!");
    } catch {
      setMensagem("Erro ao adicionar cupão.");
    }
  };

  const iniciarEdicao = c => {
    setEditId(c.id);
    setEditCupao(c);
  };
  const cancelarEdicao = () => {
    setEditId(null);
    setEditCupao({ codigo: "", desconto: "", ativo: true });
  };
  const guardarEdicao = async () => {
    if (!editCupao.codigo || !editCupao.desconto) {
      setMensagem("Preenche o código e desconto.");
      return;
    }
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "cupoes", editId), editCupao);
      cancelarEdicao();
      setMensagem("Cupão atualizado!");
    } catch {
      setMensagem("Erro ao atualizar cupão.");
    }
  };
  const eliminarCupao = async id => {
    if (!window.confirm("Eliminar cupão?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "cupoes", id));
      setMensagem("Cupão eliminado!");
    } catch {
      setMensagem("Erro ao eliminar cupão.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>
        ← Retroceder
      </button>
      <h2 className="text-3xl font-bold text-yellow-700 mb-6">Gestão de Promoções/Cupões</h2>
      {mensagem && <div className="mb-2 text-blue-700 font-semibold">{mensagem}</div>}
      <div className="mb-6 flex gap-2">
        <input className="border px-3 py-1 rounded" placeholder="Código" value={novo.codigo} onChange={e => setNovo(n => ({ ...n, codigo: e.target.value }))} />
        <input className="border px-3 py-1 rounded" placeholder="Desconto" value={novo.desconto} onChange={e => setNovo(n => ({ ...n, desconto: e.target.value }))} />
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={adicionarCupao}>Adicionar</button>
      </div>
      <table className="min-w-full border mt-4 bg-white shadow rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Código</th>
            <th className="px-4 py-2 border-b text-left">Desconto</th>
            <th className="px-4 py-2 border-b text-left">Ativo</th>
            <th className="px-4 py-2 border-b text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cupoes.map((c) => (
            <tr key={c.id}>
              {editId === c.id ? (
                <>
                  <td className="border-b"><input className="w-full" value={editCupao.codigo} onChange={e => setEditCupao(c => ({ ...c, codigo: e.target.value }))} /></td>
                  <td className="border-b"><input className="w-full" value={editCupao.desconto} onChange={e => setEditCupao(c => ({ ...c, desconto: e.target.value }))} /></td>
                  <td className="border-b">
                    <select value={editCupao.ativo ? "Sim" : "Não"} onChange={e => setEditCupao(c => ({ ...c, ativo: e.target.value === "Sim" }))}>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </td>
                  <td className="border-b whitespace-nowrap">
                    <button className="bg-green-600 text-white px-2 py-1 mr-1 rounded" onClick={guardarEdicao}>Guardar</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={cancelarEdicao}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border-b">{c.codigo}</td>
                  <td className="border-b">{c.desconto}</td>
                  <td className="border-b">
                    <span className={c.ativo ? "text-green-700 font-bold" : "text-red-700 font-bold"}>{c.ativo ? "Sim" : "Não"}</span>
                  </td>
                  <td className="border-b whitespace-nowrap">
                    <button className="bg-yellow-400 text-xs px-2 py-1 mr-1 rounded" onClick={() => iniciarEdicao(c)}>Editar</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => eliminarCupao(c.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
