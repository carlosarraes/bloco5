const inputText = document.querySelector('#carta-texto');
const textoGerado = document.querySelector('#carta-gerada');
const gerarBtn = document.querySelector('#criar-carta');
const contaPalavras = document.querySelector('#carta-contador');
const estilo = ['newspaper', 'magazine1', 'magazine2'];
const tamanho = ['medium', 'big', 'reallybig'];
const rotacao = ['rotateleft', 'rotateright'];
const inclinacao = ['skewleft', 'skewright'];

function geraNum(x) {
  return Math.floor(Math.random() * x);
}

function mudaEstilo(e) {
  e.target.className = '';
  e.target.classList.toggle(estilo[geraNum(3)]);
  e.target.classList.toggle(tamanho[geraNum(3)]);
  e.target.classList.toggle(rotacao[geraNum(2)]);
  e.target.classList.toggle(inclinacao[geraNum(2)]);
}

function geraTexto() {
  if (!inputText.value || inputText.value.trim().length === 0) {
    textoGerado.innerText = 'Por favor, digite o conteúdo da carta.';
  } else {
    const savedText = inputText.value.split(' ');
    textoGerado.innerHTML = '';
    for (let i = 0; i < savedText.length; i += 1) {
      const spanText = document.createElement('span');
      contaPalavras.innerText = `Palavras: ${savedText.length}`;
      spanText.addEventListener('click', mudaEstilo);
      spanText.innerText = savedText[i];
      spanText.classList.toggle(estilo[geraNum(3)]);
      spanText.classList.toggle(tamanho[geraNum(3)]);
      spanText.classList.toggle(rotacao[geraNum(2)]);
      spanText.classList.toggle(inclinacao[geraNum(2)]);
      textoGerado.appendChild(spanText);
    }
  }
}

gerarBtn.addEventListener('click', geraTexto);
