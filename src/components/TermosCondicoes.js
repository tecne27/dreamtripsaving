import React from "react";

export default function TermosCondicoes() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Termos e Condições de Utilização</h1>
      <p className="mb-5">
        Ao aceder e utilizar o DreamTripSavings, concorda com os seguintes Termos e Condições. Leia-os atentamente antes de utilizar o nosso serviço. Estes Termos regem a utilização da plataforma, a criação de contas, a gestão de saldo, reservas, compras e utilização de funcionalidades associadas.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">1. Definições</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>DreamTripSavings: Plataforma online de gestão de saldo para viagens, propriedade de Ricardo Fernandes.</li>
        <li>Utilizador: Qualquer pessoa que crie conta ou utilize o serviço.</li>
        <li>Pacote de viagem: Produto/serviço vendido diretamente pelo DreamTripSavings.</li>
        <li>Produtos de parceiros: Produtos ou serviços disponibilizados através de links de afiliação, vendidos e entregues por terceiros.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">2. Conta e Acesso</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>É obrigatório ter mais de 18 anos para registar conta e carregar saldo.</li>
        <li>O utilizador é responsável pela veracidade dos dados fornecidos.</li>
        <li>O saldo carregado é pessoal, intransmissível e não é reembolsável, exceto em situações legalmente previstas.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">3. Saldo e Pagamentos</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>O saldo é carregado através do Stripe, por cartão de crédito ou outros métodos disponibilizados.</li>
        <li>O DreamTripSavings não guarda dados bancários dos utilizadores.</li>
        <li>O saldo só pode ser usado para comprar pacotes de viagem no site. Produtos de parceiros são pagos nos respetivos sites externos.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">4. Reservas e Pacotes de Viagem</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>Os pacotes de viagem são vendidos e geridos diretamente pelo DreamTripSavings.</li>
        <li>Para reservar, pode ser solicitado o preenchimento de dados pessoais necessários para a reserva legal junto dos parceiros.</li>
        <li>O pagamento de pacotes é feito com saldo carregado no site.</li>
        <li>O cancelamento ou alteração de reservas está sujeito às condições específicas de cada pacote e à disponibilidade dos parceiros envolvidos.</li>
        <li>O DreamTripSavings não é responsável por atrasos, cancelamentos, problemas de transporte ou alojamento geridos por terceiros.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">5. Produtos de Parceiros e Afiliações</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>Alguns produtos ou serviços apresentados no site são vendidos por parceiros, através de links de afiliação.</li>
        <li>Compras efetuadas nesses sites estão sujeitas aos Termos do parceiro externo, não ao DreamTripSavings.</li>
        <li>Poderemos receber comissões por compras ou reservas efetuadas através destes links.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">6. Responsabilidades</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>O DreamTripSavings esforça-se por garantir informação correta e atualizada, mas não garante a ausência de erros, omissões ou interrupções do serviço.</li>
        <li>O utilizador deve garantir que cumpre todos os requisitos legais para viajar e reservar serviços.</li>
        <li>O DreamTripSavings não se responsabiliza por danos indiretos ou perdas resultantes do uso do site ou dos serviços de parceiros.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">7. Cancelamento e Eliminação de Conta</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>O utilizador pode pedir a eliminação da conta por email para dreamtripsavingsbook@gmail.com.</li>
        <li>A eliminação é definitiva e implica perda de acesso ao saldo e histórico de reservas.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">8. Propriedade Intelectual</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>Todos os conteúdos, imagens e textos do site são propriedade do DreamTripSavings, salvo indicação em contrário.</li>
        <li>É proibida a reprodução, distribuição ou uso sem autorização expressa.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">9. Alterações aos Termos</h2>
      <p className="mb-3">
        Reservamo-nos o direito de alterar estes Termos a qualquer momento. As alterações serão publicadas nesta página.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">10. Lei Aplicável</h2>
      <p className="mb-3">
        Estes Termos são regidos pela lei portuguesa e europeia. Em caso de litígio, o foro competente será o da comarca de Portugal.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">11. Contacto</h2>
      <p>
        Para questões legais ou pedidos, contacte: dreamtripsavingsbook@gmail.com ou WhatsApp +351 937765649.
      </p>
    </div>
  );
}
