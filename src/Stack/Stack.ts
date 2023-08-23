export default class Stack<T> {
  private items: T[] = [];

  push = (item: T) => {
    this.items.push(item);
  };
  pop = () => {
    return this.items.pop();
  };

  peek = () => {
    return this.items[this.items.length - 1];
  };

  isEmpty = () => {
    return this.items.length === 0;
  };

  get size() {
    return this.items.length;
  }
}
