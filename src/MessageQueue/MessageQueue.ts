import { Queue } from "../Queue";

type Callback<T> = (message: T) => void;

export default class MessageQueue<T> {
  private queue = new Queue<T>();
  private subscribers: Callback<T>[] = [];
  private maxSize?: number;

  constructor(maxSize?: number) {
    this.maxSize = maxSize;
  }

  private validateInsertion = () => {
    if (this.maxSize && this.queue.size() >= this.maxSize) {
      throw new Error("Queue is full");
    }
  };

  private notify = (message: T) => {
    for (const cb of this.subscribers) {
      cb(message);
    }
  };

  private addItem = (message: T) => {
    this.validateInsertion();
    this.queue.enqueue(message);
    this.notify(message);
  };

  enqueue = (message: T | T[]) => {
    if (Array.isArray(message)) {
      for (const m of message) {
        this.addItem(m);
      }
    } else {
      this.addItem(message);
    }
  };

  dequeue = (cb?: Callback<T>) => {
    const item = this.queue.dequeue();
    if (item) {
      cb && cb(item);
    }
    return item;
  };

  subscribe = (cb: Callback<T>) => {
    this.subscribers.push(cb);
  };

  unsubscribe = (cb: Callback<T>) => {
    this.subscribers = this.subscribers.filter((sub) => sub !== cb);
  };

  isEmpty = () => this.queue.isEmpty();
  size = () => this.queue.size();
  clear = () => this.queue.clear();
}
