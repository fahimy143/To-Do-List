import Status from './status.js';

const status = new Status();

export default class Tasks {
  // constructor() {
  //   this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  // }

    displayTask = () => {
      const todoContainer = document.querySelector('#todo-list');
      todoContainer.innerHTML = '';
      this.tasksArray.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'todo-task';
        li.innerHTML = `<div><button class="check-task">
                                <i class="fa-regular fa-square"></i>
                                <i class="fa-solid fa-check"></i>
                              </button>
                              <input class="todo-input" type="text" value="${task.description}">
                        </div>
                        <button class="delete-task"><i class="fa-solid fa-trash-can"></i></button>
                        <button class="menu-task"><i class="fa-solid fa-ellipsis-vertical"></i></button>`;
        todoContainer.insertBefore(li, todoContainer.children[task.index]);
        if (task.isCompleted) {
          li.classList.add('active');
        }
      });

      const deleteBtn = document.querySelectorAll('.delete-task');
      deleteBtn.forEach((button, index) => {
        button.addEventListener('click', () => {
          this.remove(index);
        });
      });

      const editInput = document.querySelectorAll('.todo-input');
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

      status.completeTask(this.tasksArray);
    }

  add = (value, taskList) => {
    // this.tasksArray.push({
    //   description: value,
    //   isCompleted: false,
    //   index: this.tasksArray.length,
    // });
    // localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    // this.displayTask();
    taskList.push({
      description: value,
      isCompleted: false,
      id: taskList.length,
    });
    return taskList;
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
