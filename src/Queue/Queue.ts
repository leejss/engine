export default class Queue<T> {
  private array: T[] = [];

  isEmpty = () => {
    return this.array.length === 0;
  };

  enqueue = (item: T) => {
    this.array.push(item);
  };
  dequeue = (): T | null => {
    if (this.isEmpty()) {
      return null;
    }
    return this.array.shift() as T;
  };
  peek = () => {
    if (this.isEmpty()) {
      return null;
    }
    return this.array[0];
  };
  size = () => {
    return this.array.length;
  };

  clear = () => {
    this.array = [];
  };
}
