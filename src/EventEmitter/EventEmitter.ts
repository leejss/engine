type Handler = (...args: any) => void;

export default class EventEmitter {
  private map: Map<string, Set<Handler>> = new Map();

  on(name: string, handler: Handler) {
    if (this.map.get(name)) {
      this.map.get(name)!.add(handler);
    } else {
      this.map.set(name, new Set([handler]));
    }
  }

  once(name: string, handler: Handler) {
    const onceHandler = (...args: any) => {
      handler(...args);
      this.off(name, onceHandler);
    };

    this.on(name, onceHandler);
  }
  off(name: string, handler: Handler) {
    const handlers = this.map.get(name);
    if (handlers) {
      handlers.delete(handler);
    }
  }
  emit(name: string, payload?: any) {
    const handlers = this.map.get(name);
    if (!handlers) throw new Error("No registered event");

    handlers.forEach((handler) => handler(payload));
  }
  clear() {
    this.map.clear();
  }

  get size() {
    return this.map.size;
  }
}
