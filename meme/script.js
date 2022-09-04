const inputText = document.querySelector('#text-input');
const textShow = document.querySelector('#meme-text');
const sendMeme = document.querySelector('#meme-insert');
const image = document.querySelector('#meme-image');
const container = document.querySelector('#meme-image-container');
const fireBtn = document.querySelector('#fire');
const waterBtn = document.querySelector('#water');
const earthBtn = document.querySelector('#earth');
const memeOne = document.querySelector('#meme-1');
const memeTwo = document.querySelector('#meme-2');
const memeThree = document.querySelector('#meme-3');
const memeFour = document.querySelector('#meme-4');

function mudaText(e) {
  textShow.innerText = e.target.value;
}

function setImg(e) {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onloadend = function (evt) {
    image.src = evt.target.result;
  };
}

function fireBorder() {
  container.style.border = '3px dashed rgb(255, 0, 0)';
}

function waterBorder() {
  container.style.border = '5px double rgb(0, 0, 255)';
}

function earthBorder() {
  container.style.border = '6px groove rgb(0, 128, 0)';
}

function setTemplate(e) {
  if (e.target.id === 'meme-1') {
    image.src = './imgs/meme1.png';
  } else if (e.target.id === 'meme-2') {
    image.src = './imgs/meme2.png';
  } else if (e.target.id === 'meme-3') {
    image.src = './imgs/meme3.png';
  } else {
    image.src = './imgs/meme4.png';
  }
}

inputText.addEventListener('change', mudaText);
inputText.addEventListener('keyup', mudaText);
sendMeme.addEventListener('change', setImg);
fireBtn.addEventListener('click', fireBorder);
waterBtn.addEventListener('click', waterBorder);
earthBtn.addEventListener('click', earthBorder);
memeOne.addEventListener('click', setTemplate);
memeTwo.addEventListener('click', setTemplate);
memeThree.addEventListener('click', setTemplate);
memeFour.addEventListener('click', setTemplate);
