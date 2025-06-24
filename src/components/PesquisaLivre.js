import React, { useState } from "react";

export default function PesquisaLivre() {
  const [termo, setTermo] = useState("");
  const [parceiro, setParceiro] = useState("booking");

  const getUrl = () => {
    const t = encodeURIComponent(termo.trim());
    switch (parceiro) {
      case "booking":
        // Substitui o aid demo123 pelo teu ID de afiliado Booking!
        return `https://www.booking.com/searchresults.pt.html?aid=demo123&ss=${t}`;
      case "skyscanner":
        return `https://www.skyscanner.pt/transport/flights-search/?adults=1&origin=&destination=${t}`;
      case "omio":
        return `https://www.omio.com/search/${t}`;
      case "thefork":
        return `https://www.thefork.pt/search?city=${t}`;
      default:
        return "#";
    }
  };

  const getNome = () => {
    switch (parceiro) {
      case "booking": return "Booking.com";
      case "skyscanner": return "Skyscanner";
      case "omio": return "Omio";
      case "thefork": return "TheFork";
      default: return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termo.trim()) return;
    window.open(getUrl(), "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white/80 rounded-lg shadow p-4 my-4 max-w-xl mx-auto">
      <label className="font-bold text-xl mb-2 text-blue-900">Pesquisa livre:</label>
      <input
        type="text"
        placeholder="Procura qualquer destino, hotel, voo, restaurante, comboio..."
        value={termo}
        onChange={e => setTermo(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full mb-2 focus:outline-none"
      />
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          className={`px-3 py-1 rounded ${parceiro === "booking" ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-900"} font-bold`}
          onClick={() => setParceiro("booking")}
        >
          Booking
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded ${parceiro === "skyscanner" ? "bg-green-700 text-white" : "bg-green-100 text-green-900"} font-bold`}
          onClick={() => setParceiro("skyscanner")}
        >
          Skyscanner
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded ${parceiro === "omio" ? "bg-purple-700 text-white" : "bg-purple-100 text-purple-900"} font-bold`}
          onClick={() => setParceiro("omio")}
        >
          Omio
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded ${parceiro === "thefork" ? "bg-green-800 text-white" : "bg-green-100 text-green-900"} font-bold`}
          onClick={() => setParceiro("thefork")}
        >
          TheFork
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 font-bold w-full text-lg"
      >
        Pesquisar em {getNome()}
      </button>
    </form>
  );
}

