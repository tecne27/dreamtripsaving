export function gerarSugestaoComSaldo(saldo) {
  if (saldo >= 300) {
    return "🎯 Podes viajar para Madrid de avião low-cost e ficar 3 noites num alojamento económico!";
  } else if (saldo >= 150) {
    return "🌍 Uma viagem de fim de semana a Paris com voo + hostel está ao teu alcance!";
  } else if (saldo >= 80) {
    return "🚆 Podes ir de Lisboa ao Porto de comboio e ficar 2 noites num hostel.";
  } else if (saldo >= 30) {
    return "🚉 Ida e volta de comboio até uma cidade próxima (ex: Coimbra) e visita cultural.";
  } else if (saldo >= 10) {
    return "📚 Compra um guia digital e começa a planear a tua próxima grande aventura!";
  } else {
    return "💡 Começa a poupar! Cada euro conta para te aproximares da viagem dos sonhos.";
  }
}
