import React, { useState } from "react";

// Exemplos de voluntariado com imagens reais
const voluntariadoData = [
  {
    id: 1,
    nome: "Ajuda a Crianças em Moçambique",
    local: "Maputo, Moçambique",
    descricao: "Ensina inglês, matemática e oferece apoio social a crianças em bairros carenciados.",
    imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteerworld.com/pt/volunteer-abroad/mozambique",
    tags: ["África", "Educação", "Infância", "Alojamento Incluído"],
    pdf: "https://www.volunteerworld.com/pt/volunteer-abroad/mozambique.pdf"
  },
  {
    id: 2,
    nome: "Projeto Marinho em Bali",
    local: "Bali, Indonésia",
    descricao: "Ajuda a conservar recifes de coral e a proteger tartarugas marinhas. Inclui alojamento local.",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    link: "https://www.goeco.org/area/volunteer-in-asia/indonesia/bali-marine-conservation",
    tags: ["Ásia", "Ambiente", "Animais", "Praia", "Alojamento Incluído"],
    pdf: "https://www.goeco.org/media/2338/bali-marine.pdf"
  },
  {
    id: 3,
    nome: "Construção de Escolas no Nepal",
    local: "Kathmandu, Nepal",
    descricao: "Ajuda a construir infraestruturas escolares em vilas remotas. Tudo incluído, só tens de ajudar.",
    imagem: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    link: "https://www.projects-abroad.org/volunteer-projects/construction/nepal/",
    tags: ["Ásia", "Construção", "Educação", "Grátis"],
    pdf: "https://www.projects-abroad.org/docs/nepal-construction.pdf"
  },
  {
    id: 4,
    nome: "Proteção de Vida Selvagem na Costa Rica",
    local: "Parque Nacional Tortuguero, Costa Rica",
    descricao: "Trabalha na proteção de espécies ameaçadas. Tudo incluído: estadia, refeições e transporte local.",
    imagem: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    link: "https://www.gvi.pt/programas/voluntariado-costa-rica-protecao-da-vida-selvagem/",
    tags: ["América Central", "Ambiente", "Animais", "Tudo Incluído"],
    pdf: "https://www.gvi.pt/media/costa-rica-wildlife.pdf"
  },
  {
    id: 5,
    nome: "Voluntariado em Quintas Orgânicas na Itália",
    local: "Toscana, Itália",
    descricao: "Ajuda em quintas biológicas e recebe alimentação e alojamento gratuitos.",
    imagem: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
    link: "https://wwoof.pt/",
    tags: ["Europa", "Agricultura", "Cultura Local", "Alojamento Incluído"],
    pdf: "https://wwoof.pt/ficheiro-exemplo.pdf"
  },
  {
    id: 6,
    nome: "Resgate Animal no Brasil",
    local: "Manaus, Brasil",
    descricao: "Colabora em centros de resgate de animais selvagens na floresta Amazónica.",
    imagem: "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteerbrazil.com/animal-rescue",
    tags: ["América do Sul", "Animais", "Ambiente", "Alojamento Incluído"],
    pdf: "https://www.volunteerbrazil.com/media/animal-rescue.pdf"
  },
  {
    id: 7,
    nome: "Apoio a Refugiados na Grécia",
    local: "Lesbos, Grécia",
    descricao: "Ajuda na receção e integração de refugiados, distribuição de bens e aulas de línguas.",
    imagem: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteerhq.org/pt/volunteer-in-greece/",
    tags: ["Europa", "Refugiados", "Educação", "Ajuda Humanitária"],
    pdf: "https://www.volunteerhq.org/pt/volunteer-in-greece.pdf"
  },
  {
    id: 8,
    nome: "Ensino em Cabo Verde",
    local: "Praia, Cabo Verde",
    descricao: "Ensina crianças e adolescentes em zonas desfavorecidas.",
    imagem: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteerworld.com/pt/volunteer-abroad/cabo-verde",
    tags: ["África", "Educação", "Infância"],
    pdf: "https://www.volunteerworld.com/pt/volunteer-abroad/cabo-verde.pdf"
  },
  {
    id: 9,
    nome: "Voluntariado Ambiental nos Açores",
    local: "Açores, Portugal",
    descricao: "Protege ecossistemas, faz limpeza costeira e preservação de espécies endémicas.",
    imagem: "https://images.unsplash.com/photo-1465101178521-cb57b0c17045?auto=format&fit=crop&w=600&q=80",
    link: "https://www.oceanazores.org/pt/voluntariado/",
    tags: ["Portugal", "Ambiente", "Mar", "Grátis"],
    pdf: "https://www.oceanazores.org/media/voluntariado-acores.pdf"
  },
  {
    id: 10,
    nome: "Voluntariado Social em Timor-Leste",
    local: "Díli, Timor-Leste",
    descricao: "Ajuda comunidades em projetos educativos e de saúde pública.",
    imagem: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteering.org.au/volunteer-abroad/timor-leste",
    tags: ["Ásia", "Saúde", "Educação", "Comunidade"],
    pdf: "https://www.volunteering.org.au/docs/timor-leste-voluntariado.pdf"
  },
  {
    id: 11,
    nome: "Educação Digital no Vietname",
    local: "Hanói, Vietname",
    descricao: "Ensina competências digitais a jovens desfavorecidos em Hanói.",
    imagem: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteerworld.com/pt/volunteer-abroad/vietnam",
    tags: ["Ásia", "Educação", "Digital", "Tecnologia"],
    pdf: "https://www.volunteerworld.com/pt/volunteer-abroad/vietnam.pdf"
  },
  {
    id: 12,
    nome: "Apoio Médico no Uganda",
    local: "Kampala, Uganda",
    descricao: "Colabora em centros de saúde a prestar apoio médico e educação sanitária.",
    imagem: "https://images.unsplash.com/photo-1465101178521-cb57b0c17045?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteerhq.org/pt/volunteer-in-uganda/",
    tags: ["África", "Saúde", "Ajuda Humanitária"],
    pdf: "https://www.volunteerhq.org/pt/volunteer-in-uganda.pdf"
  },
  {
    id: 13,
    nome: "Cuidado de Elefantes na Tailândia",
    local: "Chiang Mai, Tailândia",
    descricao: "Ajuda no cuidado, alimentação e proteção de elefantes resgatados.",
    imagem: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    link: "https://www.goeco.org/area/volunteer-in-asia/thailand/elephant",
    tags: ["Ásia", "Animais", "Ambiente", "Tudo Incluído"],
    pdf: "https://www.goeco.org/media/elephant-thailand.pdf"
  },
  {
    id: 14,
    nome: "Voluntariado Digital Remoto",
    local: "100% Online",
    descricao: "Apoia causas globais à distância: tradução, design, programação ou marketing.",
    imagem: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    link: "https://www.catchafire.org/volunteer/",
    tags: ["Online", "Digital", "Apoio Remoto"],
    pdf: "https://www.catchafire.org/volunteer-guide.pdf"
  },
  {
    id: 15,
    nome: "Ensino de Inglês na Colômbia",
    local: "Cartagena, Colômbia",
    descricao: "Ensina inglês a crianças e jovens em bairros desfavorecidos, com alojamento incluído.",
    imagem: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    link: "https://www.volunteerhq.org/pt/volunteer-in-colombia/",
    tags: ["América do Sul", "Educação", "Infância", "Alojamento Incluído"],
    pdf: "https://www.volunteerhq.org/pt/volunteer-in-colombia.pdf"
  },
];

// Card de Voluntariado
function CardVoluntariado({ v }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
      <img src={v.imagem} alt={v.nome} className="h-44 w-full object-cover" loading="lazy" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-1">{v.nome}</h3>
        <span className="text-xs text-gray-500 mb-1">{v.local}</span>
        <p className="mb-2 text-gray-700 text-sm flex-1">{v.descricao}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {v.tags.map((tag) => (
            <span key={tag} className="bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <a
            href={v.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700"
          >
            Saber mais
          </a>
          <a
            href={v.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-gray-700"
          >
            PDF grátis
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Voluntariado() {
  const [filtro, setFiltro] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [destino, setDestino] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [formOk, setFormOk] = useState(false);

  const voluntariosFiltrados = filtro
    ? voluntariadoData.filter((v) =>
        v.tags.some((tag) => tag.toLowerCase().includes(filtro.toLowerCase())) ||
        v.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        v.local.toLowerCase().includes(filtro.toLowerCase())
      )
    : voluntariadoData;

  // Simula envio de formulário (apenas mostra mensagem de sucesso)
  function handleForm(e) {
    e.preventDefault();
    setFormOk(true);
    setNome("");
    setEmail("");
    setDestino("");
    setMensagem("");
    setTimeout(() => setFormOk(false), 6000);
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Banner topo */}
      <div className="mb-10 flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Voluntariado Mundo"
          className="rounded-2xl shadow-xl w-full max-w-4xl h-72 object-cover mb-4"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3 text-center drop-shadow-sm">
          Voluntariado pelo Mundo <span className="text-green-600">100% Gratuito</span>
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-2">
          Encontra missões de voluntariado com alojamento, alimentação e experiências únicas incluídas.<br />
          Participa, faz a diferença e viaja sem pagar!
        </p>
      </div>
      {/* Filtro */}
      <div className="mb-6 flex gap-3 flex-wrap justify-center">
        <input
          type="text"
          placeholder="Filtrar por tema, país, animal, ambiente, saúde, etc."
          className="p-2 rounded-lg border border-gray-300 focus:outline-blue-600 min-w-[220px]"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
      {/* Cards de voluntariado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {voluntariosFiltrados.map((v) => (
          <CardVoluntariado key={v.id} v={v} />
        ))}
      </div>
      {/* Formulário para candidatura */}
      <div className="mt-16 max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-bold text-blue-700 mb-2">Queres ser voluntário?</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Preenche para receber apoio gratuito sobre as candidaturas ou pedir ajuda personalizada.
        </p>
        <form onSubmit={handleForm} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="O teu nome"
            className="p-2 rounded border border-gray-300"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="O teu email"
            className="p-2 rounded border border-gray-300"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <select
            className="p-2 rounded border border-gray-300"
            required
            value={destino}
            onChange={e => setDestino(e.target.value)}
          >
            <option value="">Destino de interesse...</option>
            {voluntariadoData.map((v) => (
              <option key={v.id} value={v.nome}>{v.nome}</option>
            ))}
          </select>
          <textarea
            placeholder="Mensagem ou motivo da candidatura (opcional)"
            className="p-2 rounded border border-gray-300"
            rows={3}
            value={mensagem}
            onChange={e => setMensagem(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 transition"
          >
            Enviar Candidatura
          </button>
          {formOk && (
            <span className="text-green-600 mt-2 font-medium">
              Obrigado! A tua candidatura foi registada. Entraremos em contacto em breve.
            </span>
          )}
        </form>
      </div>
      {/* Rodapé */}
      <div className="mt-12 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} DreamTripSavings | Voluntariado global
      </div>
    </div>
  );
}
