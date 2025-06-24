# DreamTripSavings

**Autor:** Ricardo Fernandes

## Visão Geral

O DreamTripSavings é uma plataforma inovadora e 100% anónima para quem sonha viajar sem preocupações financeiras. Aqui, qualquer utilizador pode juntar dinheiro progressivamente, explorar destinos à medida do seu orçamento, e reservar viagens de forma simples, segura e transparente — sempre com total controlo sobre o saldo disponível e as melhores opções do mercado.

A plataforma está desenhada para democratizar o acesso a experiências de viagem, permitindo que cada pessoa descubra destinos de sonho, faça simulações realistas, e ative alertas personalizados de oportunidades e descontos — tudo sem nunca perder de vista o progresso das suas poupanças.

## Funcionalidades Principais

- Gestão de saldo com métodos de pagamento seguros (Stripe, MB Way, Cartão, etc.)
- Exploração de viagens com filtros livres (tipo Booking/Omio), sugestões inteligentes e reservas em processamento
- Navegação moderna, leve e intuitiva — cada funcionalidade em página própria (perfil, convites, simulador, reviews, etc.)
- Convites/recompensas para amigos, simulador de viagem, centro de mensagens e histórico
- Sistema de reviews e feedback de destinos
- Segurança e privacidade no registo/autenticação (Firebase)
- Pronto para integração com programas de afiliados (Booking, Omio, Skyscanner, GetYourGuide…)

## Stack Técnica

- **Frontend:** React + Tailwind CSS
- **Backend:** Firebase (Authentication, Firestore, Functions, Hosting)
- **Pagamentos:** Stripe integrado (checkout seguro)
- **Afiliados:** Ready para Booking, Omio, Skyscanner, outros

## Como correr o projeto

```bash
git clone https://github.com/teu-utilizador/dreamtripsavings.git
cd dreamtripsavings
npm install
npm start
```
Para produção:
```bash
npm run build
firebase deploy
```

## Como contribuir

Pull requests são bem-vindos. Para questões ou sugestões, abre um issue.

## Roadmap

- Integração de APIs reais de viagens/hotéis (Booking, Omio, Skyscanner)
- Automação do processamento de reservas
- Otimização visual e mobile
- Novos métodos de carregamento de saldo
- Estatísticas, alertas dinâmicos, badges e gamificação

## Licença

MIT

---

Feito com 💙 por Ricardo Fernandes e comunidade.

