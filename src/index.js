import './style.css';
import Tasks from './functionality';
import Status from './status.js';

const tasks = new Tasks();
const status = new Status();

tasks.displayTask();

const newInput = document.querySelector('#new-task');
newInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && newInput.value) {
    tasks.add(newInput.value);
    newInput.value = '';
  }
});

const refreshBtn = document.querySelector('#refresh-list');
refreshBtn.addEventListener('click', () => {
  document.location.reload();
});

status.clearAllCompleted(tasks.tasksArray);