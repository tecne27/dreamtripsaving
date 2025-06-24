import React, { useState } from "react";

const mensagensExemplo = [
  {
    id: 1,
    nome: "Promoção Especial",
    descricao: "10% de desconto nas próximas reservas dos nossos parceiros afiliados.",
    imagem: "https://cdn-icons-png.flaticon.com/512/103/103436.png",
    data: "2025-06-18"
  },
  {
    id: 2,
    nome: "Alerta de Saldo Baixo",
    descricao: "O teu saldo está a ficar baixo, adiciona fundos para não perderes oportunidades de viagem.",
    imagem: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
    data: "2025-06-15"
  },
  {
    id: 3,
    nome: "Preços Barcelona a Descer",
    descricao: "Aproveita os preços mais baixos deste mês para Barcelona — só nos nossos parceiros.",
    imagem: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    data: "2025-06-14"
  }
];

export default function Mensagens() {
  const [mensagens] = useState(mensagensExemplo);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">Mensagens & Alertas</h2>
        <a
          href="https://wa.me/351937765649?text=Olá,%20gostaria%20de%20entrar%20em%20contacto%20com%20a%20DreamTripSavings!"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-full flex items-center gap-2 transition"
          title="Enviar mensagem pelo WhatsApp"
        >
          <svg height="20" width="20" fill="white" viewBox="0 0 32 32"><path d="M16 2c7.732 0 14 6.268 14 14 0 3.032-1.008 5.839-2.733 8.111l2.02 6.058-6.271-2.017c-2.201 1.206-4.747 1.848-7.016 1.848-7.732 0-14-6.268-14-14s6.268-14 14-14zm-7.733 22.944l.425-.263 2.634-1.643c.25-.156.585-.153.83.007.983.65 2.134 1.015 3.338 1.015 1.787 0 3.453-.7 4.74-1.987s1.987-2.953 1.987-4.74c0-1.204-.364-2.355-1.015-3.338-.16-.245-.163-.58-.007-.83l1.643-2.634c.183-.292.533-.427.845-.338 3.25.88 5.667 3.832 5.667 7.206 0 4.135-3.365 7.5-7.5 7.5-3.374 0-6.326-2.417-7.206-5.667-.089-.312.046-.662.338-.845z"/></svg>
          WhatsApp
        </a>
      </div>
      <ul>
        {mensagens.map((msg) => (
          <li key={msg.id} className="mb-4 flex items-center border-b pb-3 gap-4">
            <img src={msg.imagem} alt={msg.nome} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-bold">{msg.nome}</div>
              <div className="text-gray-700 text-sm">{msg.descricao}</div>
              <div className="text-xs text-gray-400">{msg.data}</div>
            </div>
          </li>
        ))}
      </ul>
      {mensagens.length === 0 && (
        <div className="text-gray-500">Sem mensagens no momento.</div>
      )}
      <div className="mt-6 text-center text-gray-600 text-xs">
        Qualquer dúvida ou sugestão? Fala connosco diretamente pelo WhatsApp!
      </div>
    </div>
  );
}
