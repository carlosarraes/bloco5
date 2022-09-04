// Declarando constantes
const btnCores = document.querySelector('#button-random-color');
const btnClear = document.querySelector('#clear-board');
const btnVQV = document.querySelector('#generate-board');
const square = document.querySelectorAll('.color');
const boardSize = document.querySelector('#board-size');
const pixelBoard = document.querySelector('#pixel-board');

function geraCor() {
  const r = Math.ceil(Math.random() * 255);
  const g = Math.ceil(Math.random() * 255);
  const b = Math.ceil(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

function coresAleatorias() {
  const savedColors = [];
  const sqCores = document.querySelectorAll('.color');
  for (let i = 1; i < sqCores.length; i += 1) {
    const rand = geraCor();
    sqCores[i].style.backgroundColor = rand;
    savedColors.push(rand);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savedColors));
}

function clearBoard() {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
  const savedPixelColors = [];
  localStorage.setItem('pixelBoard', JSON.stringify(savedPixelColors));
}

if (localStorage.getItem('colorPalette')) {
  const savedColors = JSON.parse(localStorage.getItem('colorPalette'));
  const sqCores = document.querySelectorAll('.color');
  for (let i = 1; i < sqCores.length; i += 1) {
    sqCores[i].style.backgroundColor = savedColors[i - 1];
  }
}

function fillColor(e) {
  const selectedSquare = document.querySelector('.selected');
  const selectedColor = window
    .getComputedStyle(selectedSquare)
    .getPropertyValue('background-color');
  e.target.style.backgroundColor = selectedColor;
  const pixel = document.querySelectorAll('.pixel');
  const savedPixelColors = [];
  for (let i = 0; i < pixel.length; i += 1) {
    const savedColor = window
      .getComputedStyle(pixel[i])
      .getPropertyValue('background-color');
    savedPixelColors.push(savedColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savedPixelColors));
}

function createBoard(num) {
  for (let i = 0; i < num; i += 1) {
    const pixel = document.createElement('div');
    pixel.classList.toggle('pixel');
    pixel.addEventListener('click', fillColor);
    pixelBoard.appendChild(pixel);
  }
  pixelBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(num)}, 40px)`;
  pixelBoard.style.gridTemplateRows = `repeat(${Math.sqrt(num)}, 40px)`;
}

function selectSq(e) {
  const selectedSquare = document.querySelector('.selected');
  selectedSquare.classList.toggle('selected');
  e.target.classList.toggle('selected');
}

square.forEach((key) => {
  key.addEventListener('click', selectSq);
});

function createNewBoard() {
  if (boardSize.value === '') {
    alert('Board inválido!');
  } else if (boardSize.value < 5) {
    pixelBoard.innerHTML = '';
    pixelBoard.style.gridTemplateColumns = 'repeat(5, 48px)';
    pixelBoard.style.gridTemplateRows = 'repeat(5, 48px)';
    createBoard(25);
  } else if (boardSize.value > 50) {
    pixelBoard.innerHTML = '';
    pixelBoard.style.gridTemplateColumns = 'repeat(50, 48px)';
    pixelBoard.style.gridTemplateRows = 'repeat(50, 48px)';
    createBoard(2500);
  } else {
    pixelBoard.innerHTML = '';
    pixelBoard.style.gridTemplateColumns = `repeat(${boardSize.value}, 48px)`;
    pixelBoard.style.gridTemplateRows = `repeat(${boardSize.value}, 48px)`;
    createBoard(boardSize.value * boardSize.value);
  }
}

function saveBoard() {
  const savedSize = boardSize.value;
  localStorage.setItem('boardSize', savedSize);
}

if (localStorage.getItem('boardSize')) {
  const savedBoardSize = localStorage.getItem('boardSize');
  createBoard(savedBoardSize * savedBoardSize);
} else {
  createBoard(25);
}

if (localStorage.getItem('pixelBoard')) {
  const savedPixelColors = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 1; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = savedPixelColors[i];
  }
}

btnCores.addEventListener('click', coresAleatorias);
btnClear.addEventListener('click', clearBoard);
btnVQV.addEventListener('click', createNewBoard);
btnVQV.addEventListener('click', saveBoard);
