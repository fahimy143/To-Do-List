const Container = document.querySelector('.container');

export const editTodo = (todo, todos) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = todos.textContent;
  todo.replaceChild(editInput, todos);
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const todoContainers = document.querySelectorAll('.todo');
      const DataFromLocalStorage = JSON.parse(localStorage.getItem('list'));
      for (let i = 0; i < todoContainers.length; i++) {
        if (todoContainers[i].classList.contains('checkedContainer')) {
          DataFromLocalStorage[i].description = editInput.value;
          localStorage.setItem('list', JSON.stringify(DataFromLocalStorage));
        }
      }
      editInput.parentElement.classList.remove('checkedContainer');
      todo.replaceChild(todos, editInput);
      todos.textContent = editInput.value;
    }
  });
};

export const removeTodo = (todos) => {
  Container.removeChild(todos);
  let count = 0;
  const DataFromLocalStorage = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(DataFromLocalStorage).filter(i => i.completed === false);
  data.map(i => i.index = count++);
  localStorage.setItem(('list'), JSON.stringify(data));
};