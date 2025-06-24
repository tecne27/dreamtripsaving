import { X } from "lucide-react";
import { useState } from "react";

export default function SaldoInfoBanner() {
  const [visivel, setVisivel] = useState(true);

  if (!visivel) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-amber-100 border-b-2 border-amber-400 shadow-md py-3 px-4 flex items-center justify-between transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-1 text-amber-900 text-sm md:text-base font-medium">
        <span>
          <strong>Como funciona o saldo?</strong> O saldo serve para desbloquear ideias, sugestões e conteúdos exclusivos dentro do DreamTripSavings.
          As reservas/compras finais são feitas diretamente nos nossos parceiros (Booking, Skyscanner, Amazon, Omio, etc).
          <span className="ml-2 text-green-700 font-semibold">Quando usas os nossos links, ganhamos comissão sem custo para ti!</span>
        </span>
      </div>
      <button
        aria-label="Fechar"
        className="ml-4 p-1 rounded hover:bg-amber-200 transition"
        onClick={() => setVisivel(false)}
      >
        <X size={20} />
      </button>
    </div>
  );
}
