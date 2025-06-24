import React from "react";

export default function PoliticaPrivacidade() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Política de Privacidade</h1>
      <p className="mb-5">
        A sua privacidade é importante para nós. Esta política explica como recolhemos, utilizamos, partilhamos e protegemos os seus dados pessoais, em conformidade com o Regulamento Geral de Proteção de Dados (RGPD) e legislação portuguesa.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">1. Responsável pelo Tratamento</h2>
      <p className="mb-3">
        Ricardo Fernandes — DreamTripSavings<br />
        Portugal<br />
        Email: dreamtripsavingsbook@gmail.com<br />
        WhatsApp: +351 937765649
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">2. Dados que Recolhemos</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>Email, nome e dados de registo fornecidos ao criar conta.</li>
        <li>Informação de saldo, transações e reservas feitas no site.</li>
        <li>Dados de contacto fornecidos para suporte ou pedidos especiais.</li>
        <li>Nunca guardamos dados bancários — pagamentos são processados exclusivamente pelo Stripe.</li>
        <li>Poderemos recolher cookies funcionais e analíticos (ver política de cookies).</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">3. Para que finalidades utilizamos os dados?</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>Gestão da conta e saldo.</li>
        <li>Gestão de reservas, pacotes de viagem e pedidos de suporte.</li>
        <li>Envio de comunicações essenciais sobre o serviço.</li>
        <li>Cumprimento de obrigações legais e fiscais.</li>
        <li>Melhoria contínua da plataforma.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">4. Partilha de Dados</h2>
      <p className="mb-3">
        Só partilhamos os seus dados com:
        <ul className="list-disc pl-6">
          <li>Empresas/parceiros envolvidos na reserva dos pacotes (apenas o necessário para a reserva).</li>
          <li>Plataformas de pagamento seguras (Stripe) — não recebemos dados bancários.</li>
          <li>Entidades oficiais, se exigido por lei.</li>
        </ul>
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">5. Direitos do Utilizador</h2>
      <ul className="list-disc pl-6 mb-3">
        <li>Aceder, corrigir ou atualizar os seus dados.</li>
        <li>Pedir eliminação da conta (via email para dreamtripsavingsbook@gmail.com).</li>
        <li>Retirar consentimento para comunicações não essenciais.</li>
        <li>Solicitar portabilidade dos dados.</li>
        <li>Opor-se a determinados tratamentos.</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">6. Segurança</h2>
      <p className="mb-3">
        Usamos medidas técnicas e organizativas para proteger os dados. O acesso é restrito e todas as transações são cifradas. Não guardamos dados bancários.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">7. Menores de Idade</h2>
      <p className="mb-3">
        O site destina-se apenas a maiores de 18 anos. Não processamos dados de menores conscientemente.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">8. Alterações a esta Política</h2>
      <p className="mb-3">
        Reservamo-nos o direito de alterar esta política a qualquer momento. Quaisquer alterações serão publicadas nesta página.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">9. Contacto</h2>
      <p>
        Para exercer direitos ou esclarecer dúvidas, contacte: dreamtripsavingsbook@gmail.com ou WhatsApp: +351 937765649.
      </p>
    </div>
  );
}
