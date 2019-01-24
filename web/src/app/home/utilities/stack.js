
class Stack {
  constructor() {
    this.store = [];
  }

  push(item) {
    this.store.push(item);
  
  }

  pop() {
    return this.store.pop();
  }

  peek() {
    return this.store[this.store.length - 1];
  }



}

export default Stack;
