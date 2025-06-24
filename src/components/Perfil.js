import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";

function Perfil() {
  const { currentUser } = useAuth();
  const [nome, setNome] = useState("");
  const [pais, setPais] = useState("");
  const [preferencias, setPreferencias] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const db = getFirestore();
    const ref = doc(db, "users", currentUser.uid);
    const unsub = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNome(data.nome || "");
        setPais(data.pais || "");
        setPreferencias(data.preferencias || []);
        setFavoritos(data.favoritos || []);
      }
    });
    return () => unsub();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    setSaving(true);
    const db = getFirestore();
    await updateDoc(doc(db, "users", currentUser.uid), {
      nome,
      pais,
      preferencias,
    });
    setEditing(false);
    setSaving(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Perfil</h2>
        <div className="mb-4">
          <span className="block font-semibold">Email:</span>
          <span>{currentUser?.email}</span>
        </div>
        <div className="mb-4">
          <span className="block font-semibold">Nome:</span>
          {editing ? (
            <input
              className="border rounded px-2 py-1 w-full"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          ) : (
            <span>{nome}</span>
          )}
        </div>
        <div className="mb-4">
          <span className="block font-semibold">País:</span>
          {editing ? (
            <input
              className="border rounded px-2 py-1 w-full"
              value={pais}
              onChange={e => setPais(e.target.value)}
            />
          ) : (
            <span>{pais}</span>
          )}
        </div>
        <div className="mb-4">
          <span className="block font-semibold">Preferências de viagem:</span>
          {editing ? (
            <input
              className="border rounded px-2 py-1 w-full"
              placeholder="Ex: Praia, Cultura, Aventura"
              value={preferencias.join(", ")}
              onChange={e => setPreferencias(e.target.value.split(",").map(p => p.trim()))}
            />
          ) : (
            <span>{preferencias && preferencias.length > 0 ? preferencias.join(", ") : "—"}</span>
          )}
        </div>
        <div className="mb-4">
          <span className="block font-semibold">Favoritos:</span>
          {favoritos && favoritos.length > 0 ? (
            <ul className="list-disc ml-4">
              {favoritos.map((fav, i) => (
                <li key={i}>{fav.nome || fav}</li>
              ))}
            </ul>
          ) : (
            <span>—</span>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          {editing ? (
            <>
              <button
                className={`bg-blue-700 text-white px-4 py-2 rounded-xl font-bold shadow hover:bg-blue-900 transition ${saving ? "opacity-50" : ""}`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "A guardar..." : "Guardar"}
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-400 transition"
                onClick={() => setEditing(false)}
                disabled={saving}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-200 transition"
              onClick={() => setEditing(true)}
            >
              Editar perfil
            </button>
          )}
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm">
          Precisas de ajuda? <a href="/contacto" className="underline">Contacta-nos</a>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
