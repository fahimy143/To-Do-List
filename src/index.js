import _ from 'lodash';
import './style.css';

const inputText = document.querySelector('input');
const Container = document.querySelector('.container');

class Objects {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const Array = [];

const add = (Value) => {
  const Container = document.createElement('div');
  Container.className = 'todo';
  Container.innerHTML = `
    <input type='checkbox' class='checkbox'>
    <span>${Value}</span>
    <i class='fas fa-ellipsis-v'></i>
    <i class='fas fa-trash-alt'></i>
  `;
  Container.appendChild(todo);
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((x) => {
    x.addEventListener('click', () => {
      x.parentElement.classList.toggle('checkedContainer');
      x.nextElementSibling.classList.toggle('checkToDo');
      x.parentElement.lastElementChild.classList.toggle('trash-active');
      x.parentElement.lastElementChild.previousElementSibling.classList.toggle('edited-disable');
    });
  });

  const object = new Objects(Value, false, checkbox.length - 1);
  Array.push(object);
  localStorage.setItem('list', JSON.stringify(Array));

  const EditIcons = document.querySelectorAll('.fa-ellipsis-v');
  EditIcons.forEach((x) => {
    x.addEventListener('click', () => {

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