const fs = require('fs');
const path = require('path');

const camposObrigatorios = [ 'nome', 'descricao', 'imagem' ];

// Main: permite validar só 1 ficheiro/pasta por argumento ou tudo por defeito
const argumento = process.argv[2];
const pastasPorDefeito = [ './src/components', './src/data' ];

function listarJS(pasta) {
  let ficheiros = [];
  if (!fs.existsSync(pasta)) return ficheiros;
  fs.readdirSync(pasta).forEach(f => {
    const full = path.join(pasta, f);
    if (fs.lstatSync(full).isDirectory()) {
      ficheiros = ficheiros.concat(listarJS(full));
    } else if (f.endsWith('.js')) {
      ficheiros.push(full);
    }
  });
  return ficheiros;
}

function parseFicheiroArray(ficheiro) {
  try {
    const conteudo = fs.readFileSync(ficheiro, 'utf8');
    const arrayMatch = conteudo.match(/const\s+(\w+)\s*=\s*\[(.|\n|\r)*?];/g);
    if (!arrayMatch) return [];
    return arrayMatch.map(match => {
      const nomeArray = match.match(/const\s+(\w+)\s*=/)[1];
      try {
        const clean = match.replace(/export\s+default\s+\w+;/, '');
        // eslint-disable-next-line no-new-func
        const arr = (new Function(`${clean}; return ${nomeArray};`))();
        return { nomeArray, arr };
      } catch (err) {
        return { nomeArray, erro: true, arr: [] };
      }
    });
  } catch (e) {
    return [];
  }
}

function validaObjeto(obj, i, ficheiro, nomeArray) {
  let erros = [];
  camposObrigatorios.forEach(campo => {
    if (typeof obj[campo] !== 'string' || !obj[campo].trim()) {
      erros.push(`[${ficheiro}] ${nomeArray}[${i}]: Campo "${campo}" ausente ou vazio`);
    }
  });
  return erros;
}

function procurarDuplicados(arr) {
  const nomes = {};
  const duplicados = [];
  arr.forEach(obj => {
    if (obj && obj.nome) {
      if (nomes[obj.nome]) {
        duplicados.push(obj.nome);
      } else {
        nomes[obj.nome] = true;
      }
    }
  });
  return duplicados;
}

function validarFicheiro(ficheiro) {
  let erros = [];
  let avisos = [];
  const arrays = parseFicheiroArray(ficheiro);
  arrays.forEach(({ nomeArray, arr, erro }) => {
    if (erro) {
      erros.push(`[${ficheiro}] Erro a avaliar o array "${nomeArray}" (sintaxe?)`);
      return;
    }
    if (!Array.isArray(arr)) {
      erros.push(`[${ficheiro}] "${nomeArray}" não é um array válido`);
      return;
    }
    arr.forEach((obj, i) => {
      if (typeof obj !== 'object') return;
      erros.push(...validaObjeto(obj, i, ficheiro, nomeArray));
    });
    const duplicados = procurarDuplicados(arr);
    if (duplicados.length) {
      avisos.push(`[${ficheiro}] Duplicados em "${nomeArray}": ${duplicados.join(', ')}`);
    }
  });
  if (!arrays.length) avisos.push(`[${ficheiro}] Nenhum array exportado encontrado (pode ser normal)`);
  return { erros, avisos };
}

// Executar
let totalErros = 0;
let totalAvisos = 0;

console.log('--- Validação automática dos ficheiros de dados do projeto ---\n');

let ficheirosAlvo = [];
if (argumento) {
  if (fs.existsSync(argumento)) {
    const stat = fs.lstatSync(argumento);
    if (stat.isDirectory()) {
      ficheirosAlvo = listarJS(argumento);
    } else if (argumento.endsWith('.js')) {
      ficheirosAlvo = [argumento];
    }
  } else {
    console.log(`❌ Caminho não encontrado: ${argumento}`);
    process.exit(1);
  }
} else {
  pastasPorDefeito.forEach(pasta => {
    ficheirosAlvo = ficheirosAlvo.concat(listarJS(pasta));
  });
}

if (!ficheirosAlvo.length) {
  console.log('Nenhum ficheiro encontrado para validar.');
  process.exit(1);
}

ficheirosAlvo.forEach(ficheiro => {
  const { erros, avisos } = validarFicheiro(ficheiro);
  if (erros.length || avisos.length) {
    if (erros.length) {
      console.log(`\n❌ [ERROS] ${ficheiro}:`);
      erros.forEach(e => console.log('   ', e));
      totalErros += erros.length;
    }
    if (avisos.length) {
      console.log(`\n⚠️  [AVISOS] ${ficheiro}:`);
      avisos.forEach(a => console.log('   ', a));
      totalAvisos += avisos.length;
    }
  } else {
    console.log(`✅ ${ficheiro}: OK`);
  }
});

console.log(`\n--- Fim da validação. Erros: ${totalErros}, Avisos: ${totalAvisos} ---`);
console.log('Se quiseres validar outros campos, diz quais para adaptar o script!');
