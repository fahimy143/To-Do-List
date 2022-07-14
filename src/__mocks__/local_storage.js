class LocalStorage {
  constructor() {
    this.store = [
      { id: 1, description: 'task 1', completed: false },
      { id: 2, description: 'task 2', completed: false },
      { id: 3, description: 'task 3', completed: false },
      { id: 4, description: 'task 4', completed: false },
    ];
    console.log(this.store[0]);
  }

  getItems() {
    return this.store;
  }

  setItems(value) {
    this.store.push(value);
  }
}

export default LocalStorage;