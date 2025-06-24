import React, { useEffect, useState, useRef } from "react";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function AdminBanners({ onBack }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novo, setNovo] = useState({
    titulo: "",
    subtitulo: "",
    imagem: "",
    link: "",
    corFundo: "",
    posicao: "",
    ordem: 1,
    ativo: true,
  });
  const [editId, setEditId] = useState(null);
  const [editBanner, setEditBanner] = useState({ ...novo });
  const [mensagem, setMensagem] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "banners"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      arr.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
      setBanners(arr);
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
      if (modo === "edit") setEditBanner({ ...editBanner, imagem: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChangeNovo = e => {
    const { name, value, type, checked } = e.target;
    setNovo({
      ...novo,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleChangeEdit = e => {
    const { name, value, type, checked } = e.target;
    setEditBanner({
      ...editBanner,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const adicionarBanner = async () => {
    if (!novo.titulo && !novo.imagem) {
      setMensagem("Preenche pelo menos o título ou a imagem.");
      return;
    }
    try {
      const db = getFirestore();
      await addDoc(collection(db, "banners"), novo);
      setNovo({
        titulo: "",
        subtitulo: "",
        imagem: "",
        link: "",
        corFundo: "",
        posicao: "",
        ordem: 1,
        ativo: true,
      });
      setMensagem("Banner adicionado!");
    } catch {
      setMensagem("Erro ao adicionar banner.");
    }
  };

  const iniciarEdicao = (b) => {
    setEditId(b.id);
    setEditBanner(b);
    setMensagem("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEditBanner({ ...novo });
    setMensagem("");
  };

  const guardarEdicao = async () => {
    if (!editBanner.titulo && !editBanner.imagem) {
      setMensagem("Preenche pelo menos o título ou a imagem.");
      return;
    }
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "banners", editId), editBanner);
      cancelarEdicao();
      setMensagem("Alterações guardadas!");
    } catch {
      setMensagem("Erro ao guardar alterações.");
    }
  };

  const eliminarBanner = async (id) => {
    if (!window.confirm("Eliminar este banner?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "banners", id));
      setMensagem("Banner eliminado!");
    } catch {
      setMensagem("Erro ao eliminar banner.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Gestão de Banners Publicitários</h2>
      {mensagem && <div className="mb-4 text-blue-700 font-semibold">{mensagem}</div>}
      {loading ? (
        <div>A carregar...</div>
      ) : (
        <>
          <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden mb-6">
            <thead>
              <tr>
                <th className="px-2 py-2 border-b">Título</th>
                <th className="px-2 py-2 border-b">Subtítulo</th>
                <th className="px-2 py-2 border-b">Imagem</th>
                <th className="px-2 py-2 border-b">Cor Fundo</th>
                <th className="px-2 py-2 border-b">Posição</th>
                <th className="px-2 py-2 border-b">Ordem</th>
                <th className="px-2 py-2 border-b">Ativo</th>
                <th className="px-2 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {banners.map(b => (
                <tr key={b.id}>
                  {editId === b.id ? (
                    <>
                      <td className="border-b"><input className="w-full" name="titulo" value={editBanner.titulo} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input className="w-full" name="subtitulo" value={editBanner.subtitulo} onChange={handleChangeEdit} /></td>
                      <td className="border-b">
                        <input className="w-full mb-2" name="imagem" value={editBanner.imagem} onChange={handleChangeEdit} placeholder="URL da imagem" />
                        <input type="file" accept="image/*" className="w-full mb-2" onChange={e => handleFile(e, "edit")} />
                        {editBanner.imagem && (
                          <img src={editBanner.imagem} alt="" className="h-9 mt-1 rounded shadow" />
                        )}
                      </td>
                      <td className="border-b"><input className="w-full" name="corFundo" value={editBanner.corFundo} onChange={handleChangeEdit} placeholder="from-blue-500 to-indigo-600" /></td>
                      <td className="border-b"><input className="w-full" name="posicao" value={editBanner.posicao} onChange={handleChangeEdit} /></td>
                      <td className="border-b"><input type="number" className="w-16" name="ordem" value={editBanner.ordem} onChange={handleChangeEdit} /></td>
                      <td className="border-b text-center">
                        <input
                          type="checkbox"
                          name="ativo"
                          checked={!!editBanner.ativo}
                          onChange={handleChangeEdit}
                        />
                      </td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={guardarEdicao}>Guardar</button>
                        <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={cancelarEdicao}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b">{b.titulo}</td>
                      <td className="border-b">{b.subtitulo}</td>
                      <td className="border-b">
                        {b.imagem && <img src={b.imagem} alt={b.titulo} className="h-9 rounded shadow" />}
                      </td>
                      <td className="border-b">{b.corFundo}</td>
                      <td className="border-b">{b.posicao}</td>
                      <td className="border-b text-center">{b.ordem}</td>
                      <td className="border-b text-center">{b.ativo ? "✔️" : "—"}</td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-yellow-400 text-xs px-3 py-1 mr-2 rounded" onClick={() => iniciarEdicao(b)}>Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminarBanner(b.id)}>Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border p-4 rounded shadow bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Adicionar Novo Banner</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input name="titulo" placeholder="Título" value={novo.titulo} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="subtitulo" placeholder="Subtítulo" value={novo.subtitulo} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="imagem" placeholder="URL da imagem" value={novo.imagem} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input type="file" accept="image/*" ref={fileInputRef} onChange={e => handleFile(e, "novo")} className="border p-2 rounded" />
              <input name="link" placeholder="Link do banner (opcional)" value={novo.link} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="corFundo" placeholder="Classe Tailwind (bg ou from-to)" value={novo.corFundo} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input name="posicao" placeholder="Posição (opcional)" value={novo.posicao} onChange={handleChangeNovo} className="border p-2 rounded" />
              <input type="number" name="ordem" placeholder="Ordem" value={novo.ordem} onChange={handleChangeNovo} className="border p-2 rounded" />
              <label className="flex items-center gap-2 text-sm mt-2">
                <input type="checkbox" name="ativo" checked={!!novo.ativo} onChange={handleChangeNovo} />
                Ativo
              </label>
            </div>
            {novo.imagem && (
              <img src={novo.imagem} alt="" className="h-10 mt-2 rounded shadow" />
            )}
            <button onClick={adicionarBanner} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Adicionar Banner</button>
          </div>
        </>
      )}
    </div>
  );
}
