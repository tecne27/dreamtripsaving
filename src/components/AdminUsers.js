import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function AdminUsers({ onBack }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "users"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setUsers(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const ativarDesativar = async (id, ativo) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "users", id), { ativo: !ativo });
      setMensagem("Estado atualizado!");
    } catch {
      setMensagem("Erro ao atualizar estado do utilizador.");
    }
  };

  const eliminarUser = async (id) => {
    if (!window.confirm("Eliminar utilizador?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "users", id));
      setMensagem("Utilizador eliminado com sucesso!");
    } catch {
      setMensagem("Erro ao eliminar utilizador.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Gestão de Utilizadores</h2>
      {mensagem && <div className="mb-4 text-blue-700 font-semibold">{mensagem}</div>}
      {loading ? (
        <div>A carregar...</div>
      ) : (
        <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nome</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Estado</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && <tr><td colSpan={4} className="text-center py-4 text-gray-500">Sem utilizadores ainda.</td></tr>}
            {users.map(u => (
              <tr key={u.id}>
                <td className="border-b">{u.nome || "-"}</td>
                <td className="border-b">{u.email}</td>
                <td className="border-b">
                  <span className={u.ativo ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                    {u.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="border-b whitespace-nowrap flex gap-2">
                  <button
                    className={u.ativo ? "bg-yellow-500 text-white px-3 py-1 rounded" : "bg-green-600 text-white px-3 py-1 rounded"}
                    onClick={() => ativarDesativar(u.id, u.ativo)}
                  >
                    {u.ativo ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => eliminarUser(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
