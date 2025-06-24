import { Card, CardContent } from "@/components/ui/card";

const afiliados = [
  {
    nome: "Booking.com",
    url: "https://www.booking.com/index.html?aid=304142",
    descricao: "Hotéis, resorts e alojamentos em todo o mundo.",
    imagem: "https://seeklogo.com/images/B/booking-com-logo-3A7731C118-seeklogo.com.png",
  },
  {
    nome: "Skyscanner",
    url: "https://www.skyscanner.net/transport/flights/",
    descricao: "Pesquisa de voos baratos e flexíveis.",
    imagem: "https://logos-world.net/wp-content/uploads/2021/02/Skyscanner-Logo.png",
  },
  {
    nome: "Omio",
    url: "https://www.omio.com/?affid=omio-affiliate-1029",
    descricao: "Autocarros, comboios e voos low cost.",
    imagem: "https://cdn.worldvectorlogo.com/logos/omio.svg",
  },
  {
    nome: "Flixbus",
    url: "https://www.flixbus.com/?aff_campaign=omio_affiliate_1029",
    descricao: "Viagens de autocarro económicas na Europa.",
    imagem: "https://cdn.worldvectorlogo.com/logos/flixbus-1.svg",
  },
  {
    nome: "GetYourGuide",
    url: "https://partner.getyourguide.com/?cmp=search_widget",
    descricao: "Tours, atividades e experiências locais.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/f/f7/GetYourGuide_logo.svg",
  },
  {
    nome: "Rentalcars",
    url: "https://www.rentalcars.com/affiliates/booking.com",
    descricao: "Aluguer de carros global para todas as viagens.",
    imagem: "https://logos-download.com/wp-content/uploads/2019/01/Rentalcars.com_Logo.png",
  },
  {
    nome: "Trainline",
    url: "https://www.thetrainline.com/?utm_source=omio-affiliate-1029",
    descricao: "Bilhetes de comboio para toda a Europa.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/6/66/The_Trainline_logo.png",
  },
  {
    nome: "Airbnb",
    url: "https://www.airbnb.pt/s?af=43818305&c=.pi0.pk43818305_91143136904&gclid=CjwKCAjwzMieBhAwEiwAKXUcv8NOyUrJ9y4vXZEmTgBK6b3p-FB4t1uYQ0zNT3_bxP-8tdkEuKpWDRoCm7EQAvD_BwE",
    descricao: "Alojamento único, casas, quartos e experiências.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    nome: "Uber",
    url: "https://www.uber.com/pt/pt/",
    descricao: "Transporte rápido em cidades de todo o mundo.",
    imagem: "https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png",
  },
  {
    nome: "Kiwi.com",
    url: "https://www.kiwi.com/",
    descricao: "Voos baratos, combos e itinerários inteligentes.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kiwi.com_logo.svg/2560px-Kiwi.com_logo.svg.png",
  },
  {
    nome: "Decathlon",
    url: "https://www.decathlon.pt/",
    descricao: "Tudo para viagens desportivas e aventura.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Decathlon_Logo.svg",
  },
  {
    nome: "Amazon Viagens",
    url: "https://www.amazon.com/s?k=travel+gear",
    descricao: "Equipamento de viagem, gadgets e mochilas.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    nome: "Wise (TransferWise)",
    url: "https://wise.com/",
    descricao: "Cartão de viagens multi-moeda e transferências globais.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Wise_%28company%29_logo.svg",
  },
  {
    nome: "Revolut",
    url: "https://www.revolut.com/",
    descricao: "Conta digital ideal para viagens internacionais.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/6/68/Revolut_logo.png",
  },
  {
    nome: "Via Verde",
    url: "https://www.viaverde.pt/",
    descricao: "Pagamentos automáticos em portagens e parques.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/4/46/Via_Verde_logo.svg",
  },
];

export default function ParceirosAfiliados({ saldo }) {
  return (
    <div className="bg-white/70 dark:bg-gray-800/80 rounded-2xl p-6 my-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Reservas com Parceiros Oficiais</h2>
      <div className="mb-4">
        <span className="text-gray-700 dark:text-gray-200">Saldo disponível: </span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{saldo} €</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {afiliados.map((afiliado) => (
          <Card key={afiliado.nome} className="hover:scale-105 transition duration-200">
            <a href={afiliado.url} target="_blank" rel="noopener noreferrer">
              <CardContent className="flex flex-col items-center gap-2 p-4">
                <img src={afiliado.imagem} alt={afiliado.nome} className="w-20 h-20 object-contain mb-2" />
                <span className="font-bold">{afiliado.nome}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300 text-center">{afiliado.descricao}</span>
                <button className="mt-2 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-xl font-semibold shadow">Reservar</button>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
