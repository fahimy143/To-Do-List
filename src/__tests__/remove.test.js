import Tasks from '../modules/functionality.js';
import LocalStorage from '../__mocks__/local_storage.js';

const mockStorage = new LocalStorage();
const tasks = new Tasks();
let taskList = mockStorage.getItems();

describe('delete a task from storage', () => {
  taskList = tasks.remove(1, taskList);
  test('confirm if task is removed', () => {
    expect(taskList.length).toBe(3);
  });
  test('confirm if task reordered after removal', () => {
    expect(taskList[1].id).toBe(3);
  });
});