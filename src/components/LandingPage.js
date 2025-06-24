import React from "react";
import landingData from "../cms/landing.json"; // Ajusta o caminho se necessário

export default function LandingPage() {
  // Ignoramos stats e qualquer referência a saldo
  const {
    headline = "Viajar começa aqui.",
    subheadline = "Explora, compara e reserva experiências incríveis em todo o mundo. Encontra pacotes de viagem para todos os gostos — sem taxas escondidas e sem compromisso.",
    backgroundImage,
    showPartners,
    partners
  } = landingData;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 text-center text-white flex flex-col gap-8 items-center max-w-xl p-8 rounded-2xl bg-black bg-opacity-40 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          {headline}
        </h1>
        <p className="text-lg md:text-xl mb-2 font-medium drop-shadow-md">
          {subheadline}
        </p>
        <div className="flex gap-6 mt-4">
          <a
            href="/register"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg transition hover:scale-105"
          >
            Registar
          </a>
          <a
            href="/login"
            className="px-8 py-3 rounded-2xl bg-white bg-opacity-90 text-blue-700 font-semibold shadow-lg transition hover:scale-105"
          >
            Login
          </a>
        </div>
        {showPartners && partners && partners.length > 0 && (
          <div className="flex gap-4 mt-6 justify-center">
            {partners.map((partner, idx) => (
              <a key={idx} href={partner.link} target="_blank" rel="noopener noreferrer">
                <img src={partner.logo} alt={partner.name} className="h-10" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
