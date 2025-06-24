import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const navLinks = [
  {
    id: "home",
    nome: "Início",
    href: "/",
    icon: (
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M3 12L12 4l9 8M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    id: "explorar",
    nome: "Explorar",
    href: "/explorar",
    icon: (
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    id: "loja",
    nome: "Loja",
    href: "/loja",
    icon: (
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M6 9V7a6 6 0 0112 0v2" />
        <rect x="3" y="9" width="18" height="13" rx="2" />
      </svg>
    ),
  },
  {
    id: "voluntariado",
    nome: "Voluntariado",
    href: "/voluntariado",
    icon: (
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 21C12 21 7 16.5 7 12a5 5 0 1110 0c0 4.5-5 9-5 9z" />
      </svg>
    ),
  },
  {
    id: "favoritos",
    nome: "Favoritos",
    href: "/favoritos",
    icon: (
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5a5.5 5.5 0 1111 0c0 3.78-3.4 6.86-8.55 11.18z" />
      </svg>
    ),
  },
  {
    id: "perfil",
    nome: "Perfil",
    href: "/perfil",
    icon: (
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M16 20a4 4 0 00-8 0" />
      </svg>
    ),
  },
  {
    id: "suporte",
    nome: "Suporte",
    href: "/suporte",
    icon: (
      <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15a4 4 0 018 0" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
  },
];

const adminLink = {
  id: "admin",
  nome: "Administração",
  href: "/admin",
  icon: (
    <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 3v4M8 3v4" />
    </svg>
  ),
};

function isAdmin(user) {
  return user && (
    user.email === "ricardo35fernandes@gmail.com" ||
    user.email === "dreamtripsavingsbook@gmail.com"
  );
}

export default function MainNav() {
  const { currentUser, logout } = useAuth() || {};
  const navigate = useNavigate();

  const fullLinks = [
    ...navLinks,
    ...(isAdmin(currentUser) ? [adminLink] : [])
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-16 flex flex-col items-center bg-white shadow-xl z-40 py-6 select-none">
      <div className="flex flex-col gap-2 justify-center items-center h-full">
        {fullLinks.map((link) => (
          <NavItem key={link.id} link={link} />
        ))}
        <LogoutItem onLogout={handleLogout} />
      </div>
    </aside>
  );
}

function NavItem({ link }) {
  const [show, setShow] = React.useState(false);

  return (
    <div
      className="relative flex flex-col items-center w-full group"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <a
        href={link.href}
        title={link.nome}
        className={`
          flex flex-col items-center justify-center w-12 h-12 mx-auto rounded-lg
          transition bg-white hover:bg-blue-50 cursor-pointer
          ${window.location.pathname === link.href ? "bg-blue-100" : ""}
        `}
      >
        <span className="text-blue-700">{link.icon}</span>
      </a>
      {show && (
        <div className="absolute left-14 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap px-3 py-2 rounded-lg shadow-lg bg-gray-900 text-white text-xs font-semibold animate-fadeIn">
          {link.nome}
        </div>
      )}
    </div>
  );
}

function LogoutItem({ onLogout }) {
  const [show, setShow] = React.useState(false);
  return (
    <div
      className="relative flex flex-col items-center w-full group mt-2"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <button
        onClick={onLogout}
        title="Terminar Sessão"
        className={`
          flex flex-col items-center justify-center w-12 h-12 mx-auto rounded-lg
          transition bg-white hover:bg-red-50 cursor-pointer
        `}
        style={{ outline: "none", border: "none" }}
      >
        <span className="text-red-700">
          <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
            <path d="M3 21V3a2 2 0 012-2h7" />
          </svg>
        </span>
      </button>
      {show && (
        <div className="absolute left-14 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap px-3 py-2 rounded-lg shadow-lg bg-gray-900 text-white text-xs font-semibold animate-fadeIn">
          Terminar Sessão
        </div>
      )}
    </div>
  );
}
