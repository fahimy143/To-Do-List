import { editTodo, removeTodo } from './functionality';
import { getFromLocal, updateLocalStorage } from './Todo';
import './style.css';

const inputText = document.querySelector('input');
const Container = document.querySelector('.container');
const ClearBtn = document.querySelector('button');

class Objects {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

export const Array = [];

const add = (Value) => {
  const todo = document.createElement('div');
  todo.className = 'todo';
  todo.innerHTML += `
    <input type='checkbox' class='checkbox'>
    <span>${Value}</span>
    <i class='fas fa-ellipsis-v'></i>
    <i class='fas fa-trash-alt'></i>
  `;
  Container.appendChild(todo);
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkToDo');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edited-disable');
      updateLocalStorage();
    });
  });

  const object = new Objects(Value, false, checkbox.length - 1);
  Array.push(object);
  localStorage.setItem('list', JSON.stringify(Array));

  const EditIcons = document.querySelectorAll('.fa-ellipsis-v');
  EditIcons.forEach((i) => {
    i.addEventListener('click', () => {
      editTodo(todo, i.previousElementSibling);
      i.parentElement.classList.add('checkedContainer');
    });
  });

  const removeIcons = document.querySelectorAll('.fa-trash-alt');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    });
  });
};

inputText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputText.value) {
    e.preventDefault();
    add(inputText.value);
    inputText.value = null;
  }
});


const ClearAll = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const todo = document.querySelectorAll('.todo');
  todo.forEach((i) => {
    if (i.classList.contains('checkedContainer')) {
      removeTodo(i);
    }
  });
  let count = 0;
  const data = Array.from(localData).filter(i => i.completed === false);
  data.map(i => i.index = count++);
  localStorage.setItem('list', JSON.stringify(data));
};
ClearBtn.addEventListener('click', ClearAll);
