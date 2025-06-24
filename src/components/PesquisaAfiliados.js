import React from "react";

const parceiros = [
  {
    nome: "Booking.com",
    descricao: "Reservas de hotéis e acomodações em todo o mundo com preços competitivos.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Booking_logo.svg",
    link: "https://www.booking.com/index.pt.html?aid=1234567",
  },
  {
    nome: "Skyscanner",
    descricao: "Pesquisa e compara voos, hotéis e aluguer de carros em milhares de sites.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Skyscanner_logo_logotype.png",
    link: "https://www.skyscanner.pt/",
  },
  {
    nome: "Omio",
    descricao: "Compra de bilhetes de comboio, autocarro e avião para toda a Europa.",
    imagem: "https://play-lh.googleusercontent.com/HFphumTn_vt-T1kU7jqpR2sBc9p8loOGJlp7AiPVwJ5nyh1V7KCuMWDfwKeIlTOBFF0",
    link: "https://www.omio.pt/",
  },
  {
    nome: "FlixBus",
    descricao: "Rede de autocarros de longa distância na Europa com preços acessíveis.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Flixbus-logo.svg/2560px-Flixbus-logo.svg.png",
    link: "https://www.flixbus.pt/",
  },
  {
    nome: "CP - Comboios de Portugal",
    descricao: "Bilhetes de comboio nacionais e internacionais. Viaje de forma sustentável.",
    imagem: "https://www.cp.pt/StaticFiles/CP/Imagens/logotipo-CP.jpg",
    link: "https://www.cp.pt/passageiros/pt",
  },
  {
    nome: "GetYourGuide",
    descricao: "Atividades, excursões e experiências em destinos em todo o mundo.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/4/4d/GetYourGuide_logo.png",
    link: "https://www.getyourguide.com/",
  },
  {
    nome: "Rentalcars.com",
    descricao: "Aluguer de carros fácil e rápido em todo o mundo.",
    imagem: "https://cdn.rentalcars.com/rc-static/images/rc-logo-square.png",
    link: "https://www.rentalcars.com/",
  },
  {
    nome: "Expedia",
    descricao: "Reservas completas de voos, hotéis, carros e pacotes de férias.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Expedia_Logo.svg",
    link: "https://www.expedia.pt/",
  },
  {
    nome: "Airbnb",
    descricao: "Hospedagem local e experiências autênticas em milhares de destinos.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
    link: "https://www.airbnb.pt/",
  },
  {
    nome: "GetTransfer",
    descricao: "Transferes privados e partilhados para aeroportos e cidades.",
    imagem: "https://gettransfer.com/static/assets/img/logo-en.svg",
    link: "https://gettransfer.com/pt",
  },
  {
    nome: "City Sightseeing",
    descricao: "Autocarros turísticos hop-on hop-off em centenas de cidades mundiais.",
    imagem: "https://cdn.city-sightseeing.com/images/logos/logo.png",
    link: "https://city-sightseeing.com/",
  },
  {
    nome: "MSC Cruzeiros",
    descricao: "Cruzeiros de luxo pelo Mediterrâneo, Norte da Europa e outros destinos.",
    imagem: "https://www.msccruzeiros.pt/etc.clientlibs/msccruises/clientlibs/clientlib-site/resources/images/logos/msc-logo.svg",
    link: "https://www.msccruzeiros.pt/",
  },
];

export default function PesquisaAfiliados() {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Procura parceiros oficiais e reserváveis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parceiros.map((p, idx) => (
          <a
            key={p.nome + idx}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-5 hover:scale-105 transition transform duration-300 border border-gray-100 hover:border-blue-200"
            title={`Ir para ${p.nome}`}
          >
            <img
              src={p.imagem}
              alt={p.nome}
              className="w-16 h-16 object-contain rounded-lg bg-gray-50 shadow-inner"
              loading="lazy"
            />
            <div>
              <div className="font-bold text-lg text-gray-800">{p.nome}</div>
              <div className="text-gray-600 text-sm">{p.descricao}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
