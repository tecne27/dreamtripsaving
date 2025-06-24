import React from "react";

const faqs = [
  {
    pergunta: "O que é o DreamTripSavings?",
    resposta: "O DreamTripSavings é uma plataforma portuguesa que permite juntar saldo e reservar pacotes de viagem de forma flexível, inovadora e segura. Além disso, oferecemos acesso a produtos de parceiros externos nas nossas lojas."
  },
  {
    pergunta: "Como posso carregar saldo?",
    resposta: "O saldo pode ser carregado com cartão através do Stripe na área de utilizador, de forma segura. Todo o saldo fica disponível na sua conta para usar em pacotes de viagem."
  },
  {
    pergunta: "Como posso reservar um pacote de viagem?",
    resposta: "Após juntar saldo suficiente, pode selecionar o pacote pretendido, preencher os dados necessários para a reserva e finalizar o pagamento usando o seu saldo."
  },
  {
    pergunta: "O que acontece se cancelar a minha reserva?",
    resposta: "O cancelamento de reservas está sujeito às condições do pacote e dos parceiros envolvidos. Consulte sempre os Termos antes de efetuar qualquer pagamento. Para pedidos, contacte o suporte."
  },
  {
    pergunta: "Como funcionam as mini-lojas dos influencers?",
    resposta: "Os influencers registados podem criar e gerir a sua própria mini-loja, apresentando produtos ou experiências a que os seus seguidores podem aceder. As vendas diretas são feitas fora do site, através dos parceiros indicados."
  },
  {
    pergunta: "É seguro pagar no DreamTripSavings?",
    resposta: "Sim. O carregamento de saldo é feito através do Stripe, uma plataforma internacional segura. Não guardamos dados bancários dos utilizadores."
  },
  {
    pergunta: "Posso apagar a minha conta?",
    resposta: "Sim, basta enviar um email para dreamtripsavingsbook@gmail.com a solicitar a eliminação da conta. Alertamos que a eliminação é permanente e irá perder todo o saldo disponível."
  },
  {
    pergunta: "Quem pode usar o DreamTripSavings?",
    resposta: "Apenas maiores de 18 anos podem realizar reservas e carregar saldo. Produtos de parceiros estão sujeitos às condições desses sites."
  },
  {
    pergunta: "O DreamTripSavings guarda os meus dados bancários?",
    resposta: "Não. Todos os pagamentos de saldo são processados pelo Stripe, não temos acesso nem guardamos informações bancárias."
  },
  {
    pergunta: "Como funciona o suporte?",
    resposta: "O suporte é feito por email (dreamtripsavingsbook@gmail.com) ou WhatsApp (+351 937765649)."
  },
  {
    pergunta: "Qual a diferença entre pacotes e produtos da loja?",
    resposta: "Os pacotes de viagem são geridos diretamente por nós e pagos através do saldo. Os produtos de parceiros são vendidos em sites externos, com pagamento e entrega geridos pelo parceiro."
  },
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
