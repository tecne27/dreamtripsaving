import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Review({ destino = "", onSent }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [estado, setEstado] = useState("");

  const enviarReview = async (e) => {
    e.preventDefault();
    setEstado("A enviar...");
    const params = {
      from_name: nome,
      reply_to: email,
      destino: destino,
      message: mensagem,
    };
    try {
      await emailjs.send(
        "service_brwg6lo",
        "template_1xae8fl",
        params,
        "Z-1pNDM1R5A7mJVBG"
      );
      setEstado("Enviado com sucesso! Obrigado pelo teu feedback.");
      setNome(""); setEmail(""); setMensagem("");
      if (onSent) onSent();
    } catch (err) {
      setEstado("Erro ao enviar review. Tenta de novo.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Deixar Review</h2>
      <form onSubmit={enviarReview} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Nome"
          className="w-full border rounded p-2"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full border rounded p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <textarea
          required
          placeholder="Escreve aqui a tua review…"
          className="w-full border rounded p-2 min-h-[80px]"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 font-bold hover:bg-blue-700"
          disabled={estado === "A enviar..."}
        >
          Enviar Review
        </button>
      </form>
      {estado && <div className="mt-4 text-center">{estado}</div>}
    </div>
  );
}
