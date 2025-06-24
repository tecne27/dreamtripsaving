import React from "react";

export default function Contacto() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Contacto</h1>
      <div className="mb-6">
        <p>Para qualquer questão, pedido de suporte, sugestão ou eliminação de conta, utilize um dos seguintes contactos:</p>
        <ul className="list-disc pl-6 mt-3">
          <li>
            <b>Email:</b> <a className="text-blue-600 underline" href="mailto:dreamtripsavingsbook@gmail.com">dreamtripsavingsbook@gmail.com</a>
          </li>
          <li>
            <b>WhatsApp:</b> <a className="text-blue-600 underline" href="https://wa.me/351937765649" target="_blank" rel="noopener noreferrer">+351 937765649</a>
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <b>Responsável:</b><br />
        Ricardo Fernandes<br />
        Portugal
      </div>
      <div className="text-sm text-gray-600">
        Iremos responder a todos os contactos no prazo máximo de 3 dias úteis.<br />
        Para questões sobre reservas ou pedidos urgentes, utilize preferencialmente o WhatsApp.
      </div>
    </div>
  );
}
