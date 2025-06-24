const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');
const firebaseConfig = require('./firebaseConfig.json');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async () => {
    // Porto
    await setDoc(doc(db, 'viagensDetalhadas', 'porto'), {
      nome: 'Porto',
      capa: 'https://images.unsplash.com/photo-1549924231-f129b911e442'
    });
    await setDoc(doc(collection(db, 'viagensDetalhadas', 'porto', 'subcategorias'), 'onde_comer'), {
      titulo: 'Onde comer',
      itens: [
        {
          nome: `Francesinha`,
          descricao: `A clássica sanduíche do Porto, coberta com molho especial.`,
          imagem: `https://upload.wikimedia.org/wikipedia/commons/2/2b/Francesinha.jpg`,
          link: `https://www.thefork.pt/restaurantes?q=francesinha%20porto`
        },
        {
          nome: `Casa Guedes`,
          descricao: `Famosa pela sandes de pernil com queijo da serra.`,
          imagem: `https://media.timeout.com/images/105240236/image.jpg`,
          link: `https://www.casaguedes.pt`
        },
      ]
    });
    await setDoc(doc(collection(db, 'viagensDetalhadas', 'porto', 'subcategorias'), 'o_que_fazer'), {
      titulo: 'O que fazer',
      itens: [
        {
          nome: `Caves do Vinho do Porto`,
          descricao: `Degustação de vinhos nas margens do Douro.`,
          imagem: `https://images.unsplash.com/photo-1601297183301-1ef9a5ec7457`,
          link: `https://www.cavesvinhodoporto.com`
        },
        {
          nome: `Livraria Lello`,
          descricao: `Uma das livrarias mais bonitas do mundo.`,
          imagem: `https://upload.wikimedia.org/wikipedia/commons/e/e6/Livraria_Lello_interior.jpg`,
          link: `https://www.livrarialello.pt`
        },
      ]
    });
  
    // Barcelona
    await setDoc(doc(db, 'viagensDetalhadas', 'barcelona'), {
      nome: 'Barcelona',
      capa: 'https://images.unsplash.com/photo-1526157630371-4f7b06a69f4b'
    });
    await setDoc(doc(collection(db, 'viagensDetalhadas', 'barcelona', 'subcategorias'), 'onde_comer'), {
      titulo: 'Onde comer',
      itens: [
        {
          nome: `Tapas 24`,
          descricao: `Tapas modernas do chef Carles Abellán.`,
          imagem: `https://images.unsplash.com/photo-1608759265462-35f41d7e2ef2`,
          link: `https://www.tapac24.com`
        },
        {
          nome: `La Paradeta`,
          descricao: `Marisco fresco escolhido à vista.`,
          imagem: `https://images.unsplash.com/photo-1576866209830-9b46bfa2d3ff`,
          link: `https://www.laparadeta.com`
        },
      ]
    });
    await setDoc(doc(collection(db, 'viagensDetalhadas', 'barcelona', 'subcategorias'), 'o_que_fazer'), {
      titulo: 'O que fazer',
      itens: [
        {
          nome: `Sagrada Família`,
          descricao: `Basílica desenhada por Antoni Gaudí.`,
          imagem: `https://images.unsplash.com/photo-1520975916090-3105956f2c90`,
          link: `https://sagradafamilia.org`
        },
        {
          nome: `Parc Güell`,
          descricao: `Parque colorido com mosaicos únicos de Gaudí.`,
          imagem: `https://images.unsplash.com/photo-1623085276767-c28a20684da0`,
          link: `https://www.parkguell.barcelona`
        },
      ]
    });
  
    // Atenas
    await setDoc(doc(db, 'viagensDetalhadas', 'atenas'), {
      nome: 'Atenas',
      capa: 'https://images.unsplash.com/photo-1507812981674-3d0e58fdfd0e'
    });
    await setDoc(doc(collection(db, 'viagensDetalhadas', 'atenas', 'subcategorias'), 'onde_comer'), {
      titulo: 'Onde comer',
      itens: [
        {
          nome: `Kuzina`,
          descricao: `Cozinha moderna com vista para a Acrópole.`,
          imagem: `https://images.unsplash.com/photo-1616627981721-91835a05c809`,
          link: `https://www.kuzina.gr`
        },
        {
          nome: `Tzitzikas kai Mermigas`,
          descricao: `Taberna tradicional com pratos gregos autênticos.`,
          imagem: `https://images.unsplash.com/photo-1570032257808-7c4ee6e1f4b3`,
          link: `https://tzitzikasmermigas.gr`
        },
      ]
    });
    await setDoc(doc(collection(db, 'viagensDetalhadas', 'atenas', 'subcategorias'), 'o_que_fazer'), {
      titulo: 'O que fazer',
      itens: [
        {
          nome: `Acrópole`,
          descricao: `Conjunto arqueológico no alto da cidade.`,
          imagem: `https://images.unsplash.com/photo-1571401678880-0d2432217f33`,
          link: `https://acropolis.gr`
        },
        {
          nome: `Plaka`,
          descricao: `Bairro histórico com ruas estreitas e lojinhas.`,
          imagem: `https://images.unsplash.com/photo-1635793915315-6b305b2f9313`,
          link: `https://www.thisisathens.org`
        },
      ]
    });
  
    console.log('✅ Todas as cidades foram importadas com sucesso!');
  console.log('✅ Todas as cidades foram importadas com sucesso!');
})();