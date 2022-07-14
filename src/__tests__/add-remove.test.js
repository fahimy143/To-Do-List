/* eslint-disable */
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dom.window.document</title>
</head>
<body>
<div id="app-container">
<div id="app-header">
    <h4>Today's To Do</h4>
    <span id="reset-btn">⟳</span>
</div>
<form id="form-section" action="submit">
    <input type="text" placeholder="Add to your list..." id="add-input">
    <button id="form-btn" type="submit">⏎</button>
</form>
<ul id="task-list"></ul>
<button type="button" id="clear-all">Clear all completed</button>
</div>
</body>
</html>`);

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(dom.window, 'localStorage', {
  value: localStorageMock,
});

const taskArr = [
  {
    description: 'Task 1',
    completed: false,
    taskId: 1,
  },
];
localStorageMock.setItem('taskArr', JSON.stringify(taskArr));

function removeTask(iD) {
  const taskArr = JSON.parse(localStorageMock.getItem('taskArr')) || [];

  taskArr.forEach((task, index) => {
    if (Number(task.taskId) === Number(iD)) {
      taskArr.splice(index, 1);
    }
  });
  localStorageMock.setItem('taskArr', JSON.stringify(taskArr));
}

function addTasktoList(task) {
  const taskCtn = dom.window.document.getElementById('task-list');
  const taskLi = dom.window.document.createElement('li');
  // taskLi.setAttribute('id', task.taskId);

  taskCtn.appendChild(taskLi);
  taskLi.className = 'task';

  const indexBox = dom.window.document.createElement('h4');
  const checkBox = dom.window.document.createElement('input');
  const taskDesc = dom.window.document.createElement('input');
  const delTaskbtn = dom.window.document.createElement('button');

  taskLi.appendChild(indexBox);
  indexBox.textContent = task.taskId;

  taskLi.appendChild(checkBox);
  checkBox.className = 'checkbox';
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = task.completed;

  taskLi.appendChild(taskDesc);
  taskDesc.className = 'task-desc';
  taskDesc.setAttribute('type', 'text');
  taskDesc.value = task.description;

  taskLi.appendChild(delTaskbtn);
  delTaskbtn.textContent = '🗑';
  delTaskbtn.className = 'remove-btn';
}

dom.window.document.getElementById('form-section').addEventListener('submit', (e) => {
  // Prevent submit
  e.preventDefault();

  taskArr.forEach((task) => addTasktoList(task));
});

describe('UI DOM manipulation', () => {
  const inputForm = dom.window.document.querySelector('#add-input');
  const addBtn = dom.window.document.getElementById('form-btn');
  const taskLi = dom.window.document.querySelector('#task-list');

  inputForm.value = 'Task 1';
  addBtn.click();

  it('should add an li inside the ul ', () => {
    expect(taskLi.innerHTML).toBe('<li class="task"><h4>1</h4><input class="checkbox" type="checkbox"><input class="task-desc" type="text"><button class="remove-btn">🗑</button></li>');
  });

  it('the value of the imput should be Task 1', () => {
    expect(inputForm.value).toBe('Task 1');
  });
});

describe('Remove Task from Storage', () => {
  const removeBtn = dom.window.document.querySelector('.remove-btn');

  removeBtn.addEventListener('click', (e) => {
    // Remove Task from Storage
    removeTask(e.target.parentElement.firstChild.textContent);
  });
  removeBtn.click();
  const taskArray = JSON.parse(localStorageMock.getItem('taskArr'));

  it('task Arr should be empty', () => {
    expect(taskArray).toStrictEqual([]);
  });
});

// part2

// a function for editing the task description.
function editTask(iD, newDesc) {
  const taskArr = JSON.parse(localStorageMock.getItem('taskArr')) || [];

  taskArr.forEach((task, index) => {
    if (Number(task.taskId) === Number(iD)) {
      taskArr[index].description = newDesc;
    }
  });
  localStorageMock.setItem('taskArr', JSON.stringify(taskArr));
}

// a function for updating an item's 'completed' status.
function updateCompleted(iD, newStatus) {
  const taskArr = JSON.parse(localStorageMock.getItem('taskArr')) || [];

  taskArr.forEach((task, index) => {
    if (Number(task.taskId) === Number(iD)) {
      taskArr[index].completed = newStatus;
    }
  });
  localStorageMock.setItem('taskArr', JSON.stringify(taskArr));
}

// the "Clear all completed" function.
function clearCompleted() {
  const taskArr = JSON.parse(localStorageMock.getItem('taskArr')) || [];

  taskArr.forEach((task, index) => {
    if (task.completed) {
      taskArr.splice(index, 1);
    }
  });
  localStorageMock.setItem('taskArr', JSON.stringify(taskArr));
}

describe('Edit Task', () => {
  const taskLi = dom.window.document.querySelector('#task-list');
  const taskDesc = dom.window.document.querySelector('.task-desc');
  const editBtn = dom.window.document.querySelector('.edit-btn');

  taskDesc.value = 'Task 1';
  editTask(taskLi.id, taskDesc.value);

  it('task description should be Task 1', () => {
    expect(taskDesc.value).toBe('Task 1');
  });

  it('task description should be Task 1', () => {
    expect(taskLi.innerHTML).toBe('<li class="task"><h4>1</h4><input class="checkbox" type="checkbox"><input class="task-desc" type="text"><button class="remove-btn">🗑</button></li>');
  });
});

describe('Update Completed', () => {
  const checkBox = dom.window.document.querySelector('.checkbox');

  checkBox.click();

  it('task completed should be true', () => {
    expect(checkBox.checked).toBe(true);
  });
});

describe('Clear Completed', () => {
  const clearBtn = dom.window.document.querySelector('.remove-btn');
  const checkBox = dom.window.document.querySelector('.checkbox');

  clearBtn.click();

  it('task completed should be true', () => {
    expect(checkBox.checked).toBe(true);
  });
});