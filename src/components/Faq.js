import React from "react";

const faqs = [
  {
    pergunta: "O que é o DreamTripSaving?",
    resposta: "O DreamTripSaving é uma plataforma portuguesa onde podes encontrar, comparar e reservar viagens e experiências em todo o mundo. Não vendemos viagens diretamente — somos o teu ponto de partida para descobrir opções incríveis e reservar com os nossos parceiros de confiança."
  },
  {
    pergunta: "Tenho de pagar alguma coisa para usar o site?",
    resposta: "Não. O DreamTripSaving é totalmente gratuito para utilizadores. Só pagas diretamente aos nossos parceiros no momento da reserva, nunca ao nosso site."
  },
  {
    pergunta: "Que tipo de viagens posso encontrar?",
    resposta: "Encontras de tudo: viagens económicas, de luxo, escapadinhas, aventuras, experiências culturais, férias em família e muito mais — sempre com várias opções de preço e flexibilidade."
  },
  {
    pergunta: "Como faço uma reserva?",
    resposta: "Quando encontrares uma viagem que gostes, basta clicares em 'Reservar' e serás redirecionado para o site do parceiro (Booking, Skyscanner, Omio, etc.), onde podes completar a reserva em segurança."
  },
  {
    pergunta: "O DreamTripSaving cobra alguma comissão ou taxa nas reservas?",
    resposta: "Não. Não cobramos taxas aos utilizadores. Em alguns casos, recebemos uma pequena comissão dos parceiros, mas o preço para ti é sempre o mesmo."
  },
  {
    pergunta: "É seguro reservar através do site?",
    resposta: "Sim, só trabalhamos com parceiros reconhecidos e plataformas de confiança a nível mundial. Todas as reservas são feitas diretamente nos sites dos parceiros, com total transparência."
  },
  {
    pergunta: "Posso encontrar viagens para qualquer destino?",
    resposta: "Trabalhamos constantemente para alargar a oferta de destinos e experiências. Podes procurar viagens para praticamente qualquer parte do mundo!"
  },
  {
    pergunta: "Posso sugerir um destino ou experiência?",
    resposta: "Claro! Adoramos sugestões. Entra em contacto connosco para partilhares as tuas ideias ou destinos de sonho."
  },
  {
    pergunta: "Como funciona o suporte?",
    resposta: "O suporte é feito por email (dreamtripsavingsbook@gmail.com) ou WhatsApp (+351 937765649)."
  }
];

export default function Faq() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Perguntas Frequentes (FAQ)</h1>
      <ul>
        {faqs.map((f, i) => (
          <li key={i} className="mb-6">
            <div className="font-bold text-lg mb-1">{f.pergunta}</div>
            <div className="text-gray-700">{f.resposta}</div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-sm text-gray-600">
        Se não encontrou resposta à sua dúvida, envie-nos um email para dreamtripsavingsbook@gmail.com.
      </div>
    </div>
  );
}
