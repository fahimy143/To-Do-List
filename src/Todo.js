import { editTodo, removeTodo } from './functionality';
import { Array } from './index';

const Container = document.querySelector('.container');

const getFromLocal = () => {
  const data = JSON.parse(localStorage.getItem('list'));
  data.map(i => {
    Array.push(i);
    const todo = document.createElement('div');
    todo.className = 'todos';
    todo.innerHTML += `
      <input type='checkbox' class='checkbox'>
      <span>${i.description}</span>
      <i class='fas fa-ellipsis-v'></i>
      <i class='fas fa-trash-alt'></i>
    `;
    Container.appendChild(todo);

    const EditIcons = document.querySelectorAll('.fa-ellipsis-v');
    EditIcons.forEach((i) => {
      i.addEventListener('click', () => {
        editTodo(todo, i.previousElementSibling);
        i.parentElement.classList.add('checkedContainer');
      });
    });
  });

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

  const removeIcons = document.querySelectorAll('.fa-trash-alt');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    });
  });
  localStorage.setItem('list', JSON.stringify(Array));
};

const updateLocalStorage = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const todos = document.querySelectorAll('span');
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].classList.contains('checkToDo')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  localStorage.setItem('list', JSON.stringify(localData));
};

export { getFromLocal, updateLocalStorage };