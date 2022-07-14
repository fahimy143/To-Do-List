// eslint-disable-next-line import/no-unresolved
import Tasks from '../modules/functionality.js';
import LocalStorage from '../__mocks__/local_storage.js';

const mockStorage = new LocalStorage();
const tasks = new Tasks();
const newDescription = { description: 'task 5' };
let taskList = mockStorage.getItems();

describe('Add a new task to storage',
  () => {
    taskList = tasks.add(newDescription, taskList);
    test('check new length of array object', () => {
      expect(taskList.length).toBe(5);
    });
    test('check new description of array object', () => {
      expect(taskList[3].description).toBe('task 4');
    });
    test('check new index of array object', () => {
      expect(taskList[3].id).toBe(4);
    });
  });
