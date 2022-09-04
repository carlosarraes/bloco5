const circles = document.querySelectorAll('.ball');
const question = document.querySelector('#rgb-color');
const answer = document.querySelector('#answer');
const resetBtn = document.querySelector('#reset-game');
const scoreCount = document.querySelector('#score');
let score = 0;

function createColor() {
  const r = Math.ceil(Math.random() * 255);
  const g = Math.ceil(Math.random() * 255);
  const b = Math.ceil(Math.random() * 255);

  const color = `(${r}, ${g}, ${b})`;

  return color;
}

function checkColor(e) {
  if (e.target.style.backgroundColor.slice(3) === question.innerText) {
    answer.innerText = 'Acertou!';
    score += 3;
    scoreCount.innerText = score;
    assignColors();
  } else {
    answer.innerText = 'Errou! Tente novamente!';
    score -= 1;
    scoreCount.innerText = score;
  }
}

function assignColors() {
  const savedColors = [];
  for (let i = 0; i < circles.length; i += 1) {
    const color = createColor();
    circles[i].style.backgroundColor = `rgb${color}`;
    circles[i].addEventListener('click', checkColor);
    savedColors.push(color);
  }
  answer.innerText = 'Escolha uma cor:';
  const pickedColor = Math.floor(Math.random() * 5);
  const correctColor = savedColors[pickedColor];
  question.innerText = correctColor;
}

function resetGame() {
  score = 0;
  scoreCount.innerText = score;
  assignColors();
}

resetBtn.addEventListener('click', resetGame);

assignColors();
