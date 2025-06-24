import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

function DestinosPainel() {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novo, setNovo] = useState({
    nome: "", pais: "", descricao: "", tipo: "", categoria: "", preco: "", imagem: "", link: "", linkCompra: "", linkHotel: "", linkRestaurante: "", popular: false
  });
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState({ ...novo });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "destinos"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setDestinos(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleNovo = e => {
    const { name, value, type, checked } = e.target;
    setNovo(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  const handleEdit = e => {
    const { name, value, type, checked } = e.target;
    setEdit(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const adicionar = async () => {
    if (!novo.nome || !novo.imagem) return setMensagem("Nome e imagem obrigatórios.");
    try {
      const db = getFirestore();
      await addDoc(collection(db, "destinos"), { ...novo });
      setNovo({
        nome: "", pais: "", descricao: "", tipo: "", categoria: "", preco: "", imagem: "", link: "", linkCompra: "", linkHotel: "", linkRestaurante: "", popular: false
      });
      setMensagem("Destino adicionado.");
    } catch {
      setMensagem("Erro ao adicionar.");
    }
  };

  const iniciarEdicao = d => {
    setEditId(d.id);
    setEdit({ ...d });
    setMensagem("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEdit({ nome: "", pais: "", descricao: "", tipo: "", categoria: "", preco: "", imagem: "", link: "", linkCompra: "", linkHotel: "", linkRestaurante: "", popular: false });
    setMensagem("");
  };

  const guardarEdicao = async () => {
    if (!edit.nome || !edit.imagem) return setMensagem("Nome e imagem obrigatórios.");
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "destinos", editId), { ...edit });
      cancelarEdicao();
      setMensagem("Destino atualizado.");
    } catch {
      setMensagem("Erro ao guardar.");
    }
  };

  const eliminar = async id => {
    if (!window.confirm("Eliminar?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "destinos", id));
      setMensagem("Destino eliminado.");
    } catch {
      setMensagem("Erro ao eliminar.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 text-blue-700">Destinos</h3>
      {mensagem && <div className="mb-3 text-blue-700">{mensagem}</div>}
      {loading ? (
        <div>A carregar...</div>
      ) : (
        <>
          <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden mb-6 text-xs">
            <thead>
              <tr>
                <th className="px-2 py-2 border-b">Nome</th>
                <th className="px-2 py-2 border-b">País</th>
                <th className="px-2 py-2 border-b">Descrição</th>
                <th className="px-2 py-2 border-b">Tipo</th>
                <th className="px-2 py-2 border-b">Categoria</th>
                <th className="px-2 py-2 border-b">Preço</th>
                <th className="px-2 py-2 border-b">Imagem</th>
                <th className="px-2 py-2 border-b">Links</th>
                <th className="px-2 py-2 border-b">Popular</th>
                <th className="px-2 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {destinos.map(d => (
                <tr key={d.id}>
                  {editId === d.id ? (
                    <>
                      <td className="border-b"><input className="w-full" name="nome" value={edit.nome} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="pais" value={edit.pais} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="descricao" value={edit.descricao} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="tipo" value={edit.tipo} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="categoria" value={edit.categoria} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="preco" value={edit.preco} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="imagem" value={edit.imagem} onChange={handleEdit} /></td>
                      <td className="border-b">
                        <input className="w-full mb-1" name="link" value={edit.link} onChange={handleEdit} placeholder="Link" />
                        <input className="w-full mb-1" name="linkCompra" value={edit.linkCompra} onChange={handleEdit} placeholder="Link Compra" />
                        <input className="w-full mb-1" name="linkHotel" value={edit.linkHotel} onChange={handleEdit} placeholder="Link Hotel" />
                        <input className="w-full" name="linkRestaurante" value={edit.linkRestaurante} onChange={handleEdit} placeholder="Link Restaurante" />
                      </td>
                      <td className="border-b"><input type="checkbox" name="popular" checked={!!edit.popular} onChange={handleEdit} /></td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-green-600 text-white px-3 py-1 mr-2 rounded" onClick={guardarEdicao}>Guardar</button>
                        <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={cancelarEdicao}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b">{d.nome}</td>
                      <td className="border-b">{d.pais}</td>
                      <td className="border-b">{d.descricao}</td>
                      <td className="border-b">{d.tipo}</td>
                      <td className="border-b">{d.categoria}</td>
                      <td className="border-b">{d.preco}</td>
                      <td className="border-b max-w-xs truncate">{d.imagem && (<img src={d.imagem} alt="" className="h-10 rounded shadow border" />)}</td>
                      <td className="border-b max-w-xs truncate">
                        {d.link && <a href={d.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline block">Link</a>}
                        {d.linkCompra && <a href={d.linkCompra} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline block">Compra</a>}
                        {d.linkHotel && <a href={d.linkHotel} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline block">Hotel</a>}
                        {d.linkRestaurante && <a href={d.linkRestaurante} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline block">Restaurante</a>}
                      </td>
                      <td className="border-b">{d.popular ? "✔" : ""}</td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-yellow-400 text-xs px-3 py-1 mr-2 rounded" onClick={() => iniciarEdicao(d)}>Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminar(d.id)}>Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border p-4 rounded shadow bg-gray-50 text-sm">
            <h4 className="font-semibold mb-2">Adicionar Novo Destino</h4>
            <div className="grid grid-cols-1 gap-2">
              <input name="nome" placeholder="Nome" value={novo.nome} onChange={handleNovo} className="border p-2 rounded" />
              <input name="pais" placeholder="País" value={novo.pais} onChange={handleNovo} className="border p-2 rounded" />
              <input name="descricao" placeholder="Descrição" value={novo.descricao} onChange={handleNovo} className="border p-2 rounded" />
              <input name="tipo" placeholder="Tipo" value={novo.tipo} onChange={handleNovo} className="border p-2 rounded" />
              <input name="categoria" placeholder="Categoria" value={novo.categoria} onChange={handleNovo} className="border p-2 rounded" />
              <input name="preco" placeholder="Preço" value={novo.preco} onChange={handleNovo} className="border p-2 rounded" />
              <input name="imagem" placeholder="URL da Imagem" value={novo.imagem} onChange={handleNovo} className="border p-2 rounded" />
              <input name="link" placeholder="Link" value={novo.link} onChange={handleNovo} className="border p-2 rounded" />
              <input name="linkCompra" placeholder="Link Compra" value={novo.linkCompra} onChange={handleNovo} className="border p-2 rounded" />
              <input name="linkHotel" placeholder="Link Hotel" value={novo.linkHotel} onChange={handleNovo} className="border p-2 rounded" />
              <input name="linkRestaurante" placeholder="Link Restaurante" value={novo.linkRestaurante} onChange={handleNovo} className="border p-2 rounded" />
              <label className="inline-flex items-center gap-2 text-xs mt-1">
                <input type="checkbox" name="popular" checked={!!novo.popular} onChange={handleNovo} />
                Popular
              </label>
              <button onClick={adicionar} className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Adicionar Destino</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PacotesPainel() {
  const [pacotes, setPacotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novo, setNovo] = useState({
    nome: "", categoria: "", descricao: "", inclui: "", precoDreamTripSavings: "", precoSeparado: "", poupanca: "", ofertaExtra: "", linkCompra: "", imagens: "", bonusPontos: ""
  });
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState({ ...novo });
  const [mensagem, setMensagem] = useState("");

  const incluiToArray = (str) => typeof str === "string" ? str.split("|").map(s => s.trim()).filter(Boolean) : [];
  const imagensToArray = (str) => typeof str === "string" ? str.split("|").map(s => s.trim()).filter(Boolean) : [];

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, "pacotesViagem"), (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setPacotes(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleNovo = e => setNovo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleEdit = e => setEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const adicionar = async () => {
    if (!novo.nome || !novo.imagens) return setMensagem("Nome e imagem obrigatórios.");
    try {
      const db = getFirestore();
      await addDoc(collection(db, "pacotesViagem"), {
        ...novo,
        inclui: incluiToArray(novo.inclui),
        imagens: imagensToArray(novo.imagens)
      });
      setNovo({ nome: "", categoria: "", descricao: "", inclui: "", precoDreamTripSavings: "", precoSeparado: "", poupanca: "", ofertaExtra: "", linkCompra: "", imagens: "", bonusPontos: "" });
      setMensagem("Pacote adicionado.");
    } catch {
      setMensagem("Erro ao adicionar.");
    }
  };

  const iniciarEdicao = p => {
    setEditId(p.id);
    setEdit({
      ...p,
      inclui: Array.isArray(p.inclui) ? p.inclui.join(" | ") : (p.inclui || ""),
      imagens: Array.isArray(p.imagens) ? p.imagens.join(" | ") : (p.imagens || "")
    });
    setMensagem("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEdit({ nome: "", categoria: "", descricao: "", inclui: "", precoDreamTripSavings: "", precoSeparado: "", poupanca: "", ofertaExtra: "", linkCompra: "", imagens: "", bonusPontos: "" });
    setMensagem("");
  };

  const guardarEdicao = async () => {
    if (!edit.nome || !edit.imagens) return setMensagem("Nome e imagem obrigatórios.");
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "pacotesViagem", editId), {
        ...edit,
        inclui: incluiToArray(edit.inclui),
        imagens: imagensToArray(edit.imagens)
      });
      cancelarEdicao();
      setMensagem("Pacote atualizado.");
    } catch {
      setMensagem("Erro ao guardar.");
    }
  };

  const eliminar = async id => {
    if (!window.confirm("Eliminar?")) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "pacotesViagem", id));
      setMensagem("Pacote eliminado.");
    } catch {
      setMensagem("Erro ao eliminar.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 text-purple-700">Pacotes Reais</h3>
      {mensagem && <div className="mb-3 text-purple-700">{mensagem}</div>}
      {loading ? (
        <div>A carregar...</div>
      ) : (
        <>
          <table className="min-w-full border bg-white shadow rounded-xl overflow-hidden mb-6 text-xs">
            <thead>
              <tr>
                <th className="px-2 py-2 border-b">Nome</th>
                <th className="px-2 py-2 border-b">Categoria</th>
                <th className="px-2 py-2 border-b">Descrição</th>
                <th className="px-2 py-2 border-b">Inclui</th>
                <th className="px-2 py-2 border-b">Preço</th>
                <th className="px-2 py-2 border-b">Oferta</th>
                <th className="px-2 py-2 border-b">Link Compra</th>
                <th className="px-2 py-2 border-b">Imagens</th>
                <th className="px-2 py-2 border-b">Pontos</th>
                <th className="px-2 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacotes.map(p => (
                <tr key={p.id}>
                  {editId === p.id ? (
                    <>
                      <td className="border-b"><input className="w-full" name="nome" value={edit.nome} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="categoria" value={edit.categoria} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="descricao" value={edit.descricao} onChange={handleEdit} /></td>
                      <td className="border-b"><input className="w-full" name="inclui" value={edit.inclui} onChange={handleEdit} placeholder="Separar por |" /></td>
                      <td className="border-b">
                        <input className="w-full mb-1" name="precoDreamTripSavings" value={edit.precoDreamTripSavings} onChange={handleEdit} placeholder="Preço DreamTripSavings" />
                        <input className="w-full mb-1" name="precoSeparado" value={edit.precoSeparado} onChange={handleEdit} placeholder="Preço Separado" />
                        <input className="w-full" name="poupanca" value={edit.poupanca} onChange={handleEdit} placeholder="Poupança" />
                      </td>
                      <td className="border-b"><input className="w-full" name="ofertaExtra" value={edit.ofertaExtra} onChange={handleEdit} placeholder="Oferta" /></td>
                      <td className="border-b"><input className="w-full" name="linkCompra" value={edit.linkCompra} onChange={handleEdit} /></td>
                      <td className="border-b">
                        <input className="w-full" name="imagens" value={edit.imagens} onChange={handleEdit} placeholder="Separar por |" />
                        {edit.imagens && edit.imagens.split("|")[0] && (
                          <img src={edit.imagens.split("|")[0].trim()} alt="" className="h-10 mt-1 rounded shadow border" />
                        )}
                      </td>
                      <td className="border-b"><input className="w-full" name="bonusPontos" value={edit.bonusPontos} onChange={handleEdit} /></td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-green-600 text-white px-3 py-1 mr-2 rounded" onClick={guardarEdicao}>Guardar</button>
                        <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={cancelarEdicao}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b">{p.nome}</td>
                      <td className="border-b">{p.categoria}</td>
                      <td className="border-b">{p.descricao}</td>
                      <td className="border-b">{Array.isArray(p.inclui) ? p.inclui.join(" | ") : p.inclui}</td>
                      <td className="border-b">
                        {p.precoDreamTripSavings}€
                        {p.precoSeparado && (
                          <span className="block text-xs text-gray-600">({p.precoSeparado}€ s/ desconto)</span>
                        )}
                        {p.poupanca && (
                          <span className="block text-xs text-green-700">Poupa {p.poupanca}€</span>
                        )}
                      </td>
                      <td className="border-b">{p.ofertaExtra}</td>
                      <td className="border-b">{p.linkCompra && <a href={p.linkCompra} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Ver</a>}</td>
                      <td className="border-b max-w-xs truncate">
                        {Array.isArray(p.imagens) && p.imagens[0] && (
                          <img src={p.imagens[0]} alt="" className="h-10 rounded shadow border" />
                        )}
                      </td>
                      <td className="border-b">{p.bonusPontos}</td>
                      <td className="border-b whitespace-nowrap">
                        <button className="bg-yellow-400 text-xs px-3 py-1 mr-2 rounded" onClick={() => iniciarEdicao(p)}>Editar</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminar(p.id)}>Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border p-4 rounded shadow bg-gray-50 text-sm">
            <h4 className="font-semibold mb-2">Adicionar Novo Pacote</h4>
            <div className="grid grid-cols-1 gap-2">
              <input name="nome" placeholder="Nome" value={novo.nome} onChange={handleNovo} className="border p-2 rounded" />
              <input name="categoria" placeholder="Categoria" value={novo.categoria} onChange={handleNovo} className="border p-2 rounded" />
              <input name="descricao" placeholder="Descrição" value={novo.descricao} onChange={handleNovo} className="border p-2 rounded" />
              <input name="inclui" placeholder="Inclui (| separado)" value={novo.inclui} onChange={handleNovo} className="border p-2 rounded" />
              <input name="precoDreamTripSavings" placeholder="Preço DreamTripSavings" value={novo.precoDreamTripSavings} onChange={handleNovo} className="border p-2 rounded" />
              <input name="precoSeparado" placeholder="Preço Separado" value={novo.precoSeparado} onChange={handleNovo} className="border p-2 rounded" />
              <input name="poupanca" placeholder="Poupança (€)" value={novo.poupanca} onChange={handleNovo} className="border p-2 rounded" />
              <input name="ofertaExtra" placeholder="Oferta Extra" value={novo.ofertaExtra} onChange={handleNovo} className="border p-2 rounded" />
              <input name="linkCompra" placeholder="Link de Compra" value={novo.linkCompra} onChange={handleNovo} className="border p-2 rounded" />
              <input name="imagens" placeholder="URL(s) Imagem(ns) | separado" value={novo.imagens} onChange={handleNovo} className="border p-2 rounded" />
              <input name="bonusPontos" placeholder="Bónus Pontos" value={novo.bonusPontos} onChange={handleNovo} className="border p-2 rounded" />
              <button onClick={adicionar} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Adicionar Pacote</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminDestinos({ onBack }) {
  const [painel, setPainel] = useState("");
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={onBack}>← Retroceder</button>
      <h2 className="text-3xl font-bold text-green-700 mb-6">Gestão de Destinos e Pacotes</h2>
      {!painel && (
        <div className="flex gap-4 mb-12">
          <button className="px-8 py-3 rounded-xl bg-blue-700 text-white font-bold shadow hover:bg-blue-800" onClick={() => setPainel("destinos")}>Gerir Destinos</button>
          <button className="px-8 py-3 rounded-xl bg-purple-700 text-white font-bold shadow hover:bg-purple-800" onClick={() => setPainel("pacotes")}>Gerir Pacotes</button>
        </div>
      )}
      {painel === "destinos" && <DestinosPainel />}
      {painel === "pacotes" && <PacotesPainel />}
    </div>
  );
}
