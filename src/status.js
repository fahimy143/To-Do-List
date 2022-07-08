export default class Status {
    completeTask = (array) => {
      const checkboxes = document.querySelectorAll('.check-task');
      const todoTask = document.querySelectorAll('.todo-task');
      const delBtn = document.querySelectorAll('.delete-task');
      const mBtn = document.querySelectorAll('.menu-task');
      checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('click', () => {
          mBtn[index].classList.toggle('un');
          delBtn[index].classList.toggle('un');
          todoTask[index].classList.toggle('active');
          array[index].isCompleted = !array[index].isCompleted;
          localStorage.setItem('tasks', JSON.stringify(array));
        });
      });
    }

    clearAllCompleted = (array) => {
      const clearBtn = document.querySelector('#clear-completed');
      clearBtn.addEventListener('click', () => {
        array = array.filter((item) => item.isCompleted === false);
        localStorage.setItem('tasks', JSON.stringify(array));
        document.location.reload();
      });
    }
}