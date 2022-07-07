export default class Tasks {
  constructor() {
    this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  }

    displayTask = () => {
      const todoContainer = document.querySelector('#todo-list');
      todoContainer.innerHTML = '';
      this.tasksArray.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="check-task">
            <i class="fa-regular fa-square"></i> 
            <input class="todo-item" type="text" value="${task.description}">
            </button>
            <button class="delete-task">
            <i class="fa-solid fa-trash-can"></i>
            </button>`;
        todoContainer.insertBefore(li, todoContainer.children[task.index]);
      });

      const deleteBtn = document.querySelectorAll('.delete-task');
      deleteBtn.forEach((button, index) => {
        button.addEventListener('click', () => {
          this.remove(index);
        });
      });

      const editInput = document.querySelectorAll('.todo-item');
      editInput.forEach((input, index) => {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && input.value) {
            this.update(input.value, index);
          }
        });
        input.addEventListener('change', () => {
          if (input.value) {
            this.update(input.value, index);
          }
        });
      });
    }

    add = (value) => {
      const newTask = {
        description: value,
        isCompleted: false,
        index: this.tasksArray.length,
      };
      this.tasksArray.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
      this.displayTask();
    }

    update = (value, index) => {
      this.tasksArray[index].description = value;
      localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
      this.displayTask();
    }

    remove = (index) => {
      this.tasksArray.splice(index, 1);
      for (let i = 0; i < this.tasksArray.length; i += 1) {
        this.tasksArray[i].index = i;
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
      this.displayTask();
    }
}