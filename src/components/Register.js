import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const imagensFundo = [
  "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80"
];
const getRandomIndex = () => Math.floor(Math.random() * imagensFundo.length);

const Register = () => {
  const [imgIndex] = useState(getRandomIndex());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [nome, setNome] = useState("");
  const [convite, setConvite] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!email || !password || !confirmar || !nome) {
      setErro("Por favor, preenche todos os campos!");
      return;
    }
    if (password.length < 6) {
      setErro("A password deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmar) {
      setErro("As passwords não coincidem!");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, nome, convite);
      setSucesso("Conta criada com sucesso! Bem-vindo à DreamTripSavings!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setErro("Erro ao registar. Tenta outro email ou verifica a ligação.");
    }
    setLoading(false);
  };

  const mensagemOferta = convite.trim()
    ? `Código de convite reconhecido!`
    : "Tens código de convite ou de influencer? Usa-o aqui (opcional).";

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('${imagensFundo[imgIndex]}')`
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🧳</span> DreamTripSavings
        </h1>
        <p className="text-lg text-white font-semibold mb-3 text-center">
          Junta-te à <span className="text-cyan-300">comunidade de viajantes</span> e começa a planear a viagem dos teus sonhos!
        </p>
        <div className="mb-6 w-full">
          <div className="bg-cyan-900/80 p-3 rounded-xl text-center text-cyan-100 text-base font-bold mb-2 border-cyan-400 border flex flex-col gap-2">
            <span>
              Indicado por um amigo ou influencer?
            </span>
            <span className="text-yellow-300 font-bold">{mensagemOferta}</span>
          </div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            className="w-full mb-4 px-4 py-3 rounded text-black"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Password"
            className="w-full mb-4 px-4 py-3 rounded text-black"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Código de convite / influencer (opcional)"
            className="w-full mb-4 px-4 py-3 rounded text-black border-2 border-cyan-300"
            value={convite}
            onChange={(e) => setConvite(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {erro && (
            <div className="mb-4 text-red-400 text-center">{erro}</div>
          )}
          {sucesso && (
            <div className="mb-4 text-green-400 text-center font-bold">{sucesso}</div>
          )}
          <button
            type="submit"
            className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-xl font-bold transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "A criar conta..." : "Registar"}
          </button>
        </form>
        <p className="mt-6 text-white">
          Já tens conta?{" "}
          <span
            className="text-blue-300 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Faz login aqui
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
