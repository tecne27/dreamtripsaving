import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function AdminVoluntariado({ onBack }) {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "voluntariado"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setInscricoes(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const eliminarInscricao = async (id) => {
    if (!window.confirm("Eliminar esta inscrição?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "voluntariado", id));
      setMensagem("Inscrição eliminada com sucesso!");
    } catch {
      setMensagem("Erro ao eliminar inscrição.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-3xl font-bold text-green-700 mb-6">Gestão de Voluntariado</h2>
      {mensagem && <div className="mb-4 text-blue-700 font-semibold">{mensagem}</div>}
      {loading ? (
        <div>A carregar...</div>
      ) : (
        <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nome</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Telefone</th>
              <th className="px-4 py-2 border-b">Mensagem</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.length === 0 && <tr><td colSpan={5} className="text-center py-4 text-gray-500">Sem inscrições ainda.</td></tr>}
            {inscricoes.map(i => (
              <tr key={i.id}>
                <td className="border-b">{i.nome}</td>
                <td className="border-b">{i.email}</td>
                <td className="border-b">{i.telefone}</td>
                <td className="border-b">{i.mensagem}</td>
                <td className="border-b whitespace-nowrap">
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminarInscricao(i.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
