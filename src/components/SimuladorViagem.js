import React, { useState } from "react";

const destinos = [
  {
    nome: "Paris",
    preco: 350,
    descricao: "Descobre a cidade do amor. Inclui voo direto + 2 noites hotel 3*. Reserva fácil com parceiros oficiais.",
    imagem: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/city/fr/paris.pt-pt.html?aid=2279291"
  },
  {
    nome: "Barcelona",
    preco: 230,
    descricao: "Sol, tapas e praia num fim de semana espanhol inesquecível. Reserva instantânea.",
    imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/city/es/barcelona.pt-pt.html?aid=2279291"
  },
  {
    nome: "Roma",
    preco: 290,
    descricao: "Passeia pelo Coliseu, Fontana di Trevi e saboreia pasta autêntica. Voo e hotel incluídos.",
    imagem: "https://images.unsplash.com/photo-1509927087005-cfabfbb6b7c0?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/city/it/rome.pt-pt.html?aid=2279291"
  },
  {
    nome: "Alpes Suíços",
    preco: 540,
    descricao: "Vistas alpinas, trilhos e neve para uma escapadinha de sonho. Experiência de luxo.",
    imagem: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/region/ch/alps.pt-pt.html?aid=2279291"
  },
  {
    nome: "Madeira",
    preco: 180,
    descricao: "Natureza, levadas e clima ameno todo o ano. Voo + hotel em oferta exclusiva.",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/region/pt/madeira.pt-pt.html?aid=2279291"
  },
  {
    nome: "Nova Iorque",
    preco: 800,
    descricao: "A cidade que nunca dorme. Voo direto + hotel Manhattan, com desconto afiliado.",
    imagem: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/city/us/new-york.pt-pt.html?aid=2279291"
  },
  {
    nome: "Banguecoque",
    preco: 600,
    descricao: "Descobre templos, mercados flutuantes e gastronomia exótica na Tailândia.",
    imagem: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/city/th/bangkok.pt-pt.html?aid=2279291"
  },
  {
    nome: "Cabo Verde",
    preco: 420,
    descricao: "Praias paradisíacas e clima tropical. Pacote tudo incluído.",
    imagem: "https://images.unsplash.com/photo-1455656678494-4d1fcd877b39?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/region/cv/cape-verde.pt-pt.html?aid=2279291"
  },
  {
    nome: "Ilhas Gregas",
    preco: 550,
    descricao: "Santorini e Mykonos: azul, branco e pôr do sol inesquecível.",
    imagem: "https://images.unsplash.com/photo-1504609813445-c7d3e322ad93?auto=format&fit=crop&w=500&q=80",
    link: "https://www.booking.com/region/gr/greek-islands.pt-pt.html?aid=2279291"
  }
];

export default function SimuladorViagem() {
  const [saldo, setSaldo] = useState("");
  const [destino, setDestino] = useState(destinos[0].nome);
  const [resultado, setResultado] = useState(null);

  const simular = () => {
    const d = destinos.find((d) => d.nome === destino);
    if (!d) return;
    if (Number(saldo) >= d.preco) {
      setResultado({
        mensagem: "Já podes reservar esta viagem! 👏",
        cor: "text-green-600",
        podeReservar: true,
        destino: d
      });
    } else {
      setResultado({
        mensagem: `Faltam-te ${d.preco - Number(saldo)}€ para este destino.`,
        cor: "text-red-600",
        podeReservar: false,
        destino: d
      });
    }
  };

  const destinoSelecionado = destinos.find(d => d.nome === destino);

  return (
    <div className="max-w-xl mx-auto p-8 mt-12 bg-white/95 rounded-3xl shadow-2xl ring-2 ring-indigo-100 animate-fade-in-up">
      <h2 className="text-3xl font-extrabold text-indigo-800 mb-6 text-center tracking-tight">Simulador de Viagem</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={destinoSelecionado.imagem}
          alt={destinoSelecionado.nome}
          className="w-44 h-32 object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
        />
        <div className="flex-1">
          <div className="mb-2 text-lg font-semibold">{destinoSelecionado.nome}</div>
          <div className="mb-1 text-sm text-gray-600">{destinoSelecionado.descricao}</div>
          <div className="mb-2 text-indigo-700 font-bold">{destinoSelecionado.preco}€</div>
          <a href={destinoSelecionado.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-xs">Ver opções reais</a>
        </div>
      </div>
      <input
        className="w-full border mt-6 mb-3 rounded px-3 py-2 text-lg focus:ring-2 ring-indigo-300 transition"
        type="number"
        placeholder="Saldo disponível (€)"
        value={saldo}
        onChange={e => setSaldo(e.target.value.replace(/\D/, ""))}
      />
      <select
        className="w-full border rounded px-3 py-2 mb-4 bg-gray-50 focus:ring-2 ring-indigo-200 transition"
        value={destino}
        onChange={e => setDestino(e.target.value)}
      >
        {destinos.map(d => (
          <option key={d.nome} value={d.nome}>
            {d.nome} ({d.preco}€)
          </option>
        ))}
      </select>
      <button
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition hover:bg-indigo-700 active:scale-95"
        onClick={simular}
      >
        Simular
      </button>
      {resultado && (
        <div className={`mt-6 text-center font-bold text-xl ${resultado.cor} animate-pulse`}>
          {resultado.mensagem}
          {resultado.podeReservar && (
            <div className="mt-2">
              <a
                href={resultado.destino.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 inline-block mt-2 transition"
              >
                Reservar Agora
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
