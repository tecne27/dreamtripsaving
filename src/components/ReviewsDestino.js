import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function ReviewsDestino({ destinoId }) {
  const [reviews, setReviews] = useState([]);
  const [comentario, setComentario] = useState("");
  const [classificacao, setClassificacao] = useState(5);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      const guardadas = localStorage.getItem(`reviews_${destinoId}`);
      if (guardadas) setReviews(JSON.parse(guardadas));
    } catch {
      setReviews([]);
    }
  }, [destinoId]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!user || !comentario.trim()) return;
    const novaReview = {
      user: user.email,
      comentario,
      classificacao,
      data: new Date().toISOString()
    };
    const todas = [novaReview, ...reviews];
    setReviews(todas);
    localStorage.setItem(`reviews_${destinoId}`, JSON.stringify(todas));
    setComentario("");
    setClassificacao(5);
  };

  const media =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.classificacao), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-2 shadow">
      <h3 className="text-lg font-bold mb-1">Avaliações deste destino</h3>
      {media && (
        <div className="mb-2 text-amber-600 font-semibold">
          ⭐ {media} / 5 ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
        </div>
      )}
      <ul className="mb-4">
        {reviews.length === 0 && <li className="text-gray-400">Ainda sem avaliações.</li>}
        {reviews.map((r, idx) => (
          <li key={idx} className="mb-2 border-b border-gray-200 pb-1">
            <span className="font-semibold">{r.user}</span>
            {" — "}
            <span className="text-amber-500">{"⭐".repeat(Number(r.classificacao))}</span>
            <br />
            <span>{r.comentario}</span>
            <div className="text-xs text-gray-400">
              {new Date(r.data).toLocaleDateString()} {new Date(r.data).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>

      {user ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="font-semibold">Deixa a tua avaliação:</label>
          <select
            value={classificacao}
            onChange={e => setClassificacao(Number(e.target.value))}
            className="w-24"
          >
            {[5, 4, 3, 2, 1].map(v => (
              <option key={v} value={v}>{v} ⭐</option>
            ))}
          </select>
          <textarea
            className="border rounded px-2 py-1"
            rows={2}
            placeholder="Escreve o teu comentário (apenas utilizadores autenticados)"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-900"
          >
            Publicar Review
          </button>
        </form>
      ) : (
        <div className="text-gray-500 italic text-sm">
          Só utilizadores autenticados podem deixar reviews. <br />
          <span className="underline cursor-pointer" onClick={() => window.location.href='/login'}>
            Iniciar Sessão
          </span>
        </div>
      )}
    </div>
  );
}
