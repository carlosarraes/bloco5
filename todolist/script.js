const addBtn = document.querySelector('#criar-tarefa');
const tarefaInput = document.querySelector('#texto-tarefa');
const tarefaList = document.querySelector('#lista-tarefas');
const clearBtn = document.querySelector('#apaga-tudo');
const removeFimBtn = document.querySelector('#remover-finalizados');
const salvarBtn = document.querySelector('#salvar-tarefas');
const upBtn = document.querySelector('#mover-cima');
const downBtn = document.querySelector('#mover-baixo');
const remSelectedBtn = document.querySelector('#remover-selecionado');

function selectTarefa(e) {
  const selected = document.querySelector('.selected');

  if (selected) {
    selected.classList.remove('selected');
  }

  e.target.classList.toggle('selected');
}

function feitoTarefa(e) {
  e.target.classList.toggle('completed');
}

function addTarefa() {
  const tarefa = document.createElement('li');
  tarefa.addEventListener('click', selectTarefa);
  tarefa.addEventListener('dblclick', feitoTarefa);
  tarefa.innerText = tarefaInput.value;
  tarefaList.appendChild(tarefa);
  tarefaInput.value = '';
}

function clearTarefas() {
  tarefaList.innerHTML = '';
}

function doneTarefas() {
  const tarefasFinalizadas = document.querySelectorAll('.completed');
  tarefasFinalizadas.forEach((tarefa) => tarefa.remove());
}

// prettier-ignore
function salvarTarefas() {
  const tasks = document.getElementsByTagName('li');
  const tarefas = [];
  for (let i = 0; i < tasks.length; i += 1) {
    const tarefaObj = {
      content: tasks[i].innerText,
      class: tasks[i].className,
      bg: tasks[i].style.backgroundColor,
    };
    tarefas.push(tarefaObj);
  }
  localStorage.setItem('tasks', JSON.stringify(tarefas));
}

function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected && selected.previousElementSibling) {
    selected.parentNode.insertBefore(selected, selected.previousElementSibling);
  }
}

function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected && selected.nextElementSibling) {
    selected.parentNode.insertBefore(selected.nextElementSibling, selected);
  }
}

function removeSelected() {
  const selected = document.querySelector('.selected');
  if (selected) {
    selected.remove();
  }
}

addBtn.addEventListener('click', addTarefa);
clearBtn.addEventListener('click', clearTarefas);
removeFimBtn.addEventListener('click', doneTarefas);
salvarBtn.addEventListener('click', salvarTarefas);
upBtn.addEventListener('click', moveUp);
downBtn.addEventListener('click', moveDown);
remSelectedBtn.addEventListener('click', removeSelected);

if (localStorage.getItem('tasks')) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    const tempLi = document.createElement('li');
    tempLi.innerText = tasks[i].content;
    tempLi.style.backgroundColor = tasks[i].bg;
    tempLi.addEventListener('click', selectTarefa);
    tempLi.addEventListener('dblclick', feitoTarefa);
    if (tasks[i].class) {
      const classes = tasks[i].class.split(' ');
      if (classes.length > 1) {
        tempLi.classList.add(classes[0]);
        tempLi.classList.add(classes[1]);
      } else {
        tempLi.classList.add(classes[0]);
      }
    }
    tarefaList.appendChild(tempLi);
  }
}
