import React, { useEffect, useState } from "react";

export default function Banner18() {
  const [show, setShow] = useState(() => !localStorage.getItem("maior18aceite"));
  const aceitar = () => {
    localStorage.setItem("maior18aceite", "sim");
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl shadow-xl p-7 max-w-md text-center border-4 border-red-600">
        <div className="text-2xl font-bold mb-2 text-red-600">Só para maiores de 18 anos</div>
        <p className="mb-5">Para utilizar o DreamTripSavings e realizar reservas é necessário ser maior de idade.</p>
        <button className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold" onClick={aceitar}>
          Confirmo que sou maior de 18 anos
        </button>
      </div>
    </div>
  );
}
