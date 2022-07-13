/* eslint-disable */
import Tasks from './functionality.js';
import Status from './status.js';

const tasks = new Tasks();
const status = new Status();

describe('Tasks', () => {
  describe('add', () => {
    it('should add a new task to the list', () => {
    //arange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const task = new Tasks(wrapper);
    const todoTitle = 'first todo!';
    // act
    task.add(todoTitle);
    //assert
      expect(document.querySelectorAll('li').length).toBe(1);
    });
  });
  /* describe('remove', () => {
    it('should remove a task from the list', () => {
      tasks.add('new task');
      tasks.remove(0);
      expect(document.querySelectorAll('li').length).toBe(0);
    });
  }); */
});
