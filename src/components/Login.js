import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const imagensFundo = [
  "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1500&q=80", // avião
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80", // cidade
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80", // mar
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1500&q=80", // luxo
];
const getRandomIndex = () => Math.floor(Math.random() * imagensFundo.length);

const Login = () => {
  const [imgIndex] = useState(getRandomIndex());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEnviado, setResetEnviado] = useState(false);

  // Handler normal de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setErro("Credenciais inválidas. Tenta novamente!");
    }
    setLoading(false);
  };

  // Handler do login DEMO
  const handleDemoLogin = async () => {
    setErro("");
    setLoading(true);
    try {
      await login("demo@dreamtrip.pt", "demodemo");
      navigate("/dashboard");
    } catch (err) {
      setErro("Falha ao entrar em demo. Contacta suporte.");
    }
    setLoading(false);
  };

  // Handler de recuperação de password
  const handleResetPassword = async () => {
    setErro("");
    setResetEnviado(false);
    if (!email) {
      setErro("Introduz o teu email para recuperar a password.");
      return;
    }
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setResetEnviado(true);
    } catch (e) {
      setErro("Erro ao enviar email de recuperação. Verifica o email.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('${imagensFundo[imgIndex]}')`
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🌍</span> DreamTripSavings
        </h1>
        <p className="text-lg text-white font-semibold mb-8 text-center">
          Bem-vindo! Faz login e começa a planear a tua próxima aventura.
        </p>
        <form className="w-full" onSubmit={handleSubmit}>
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
          {erro && (
            <div className="mb-4 text-red-400 text-center">{erro}</div>
          )}
          {resetEnviado && (
            <div className="mb-4 text-green-400 text-center">
              Email de recuperação enviado! Verifica a tua caixa de entrada.
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-xl font-bold transition"
        >
          {loading ? "A entrar em demo..." : "Experimentar demo sem conta"}
        </button>

        {/* Recuperação de password */}
        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="mt-3 w-full text-blue-200 hover:text-blue-400 underline transition text-center"
        >
          Esqueceste-te da palavra-passe?
        </button>

        <p className="mt-6 text-white">
          Não tens conta?{" "}
          <span
            className="text-blue-300 underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Regista-te aqui
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
