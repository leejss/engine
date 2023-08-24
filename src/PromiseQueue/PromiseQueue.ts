type AsyncFunction = () => Promise<any>;

export default class PromiseQueue {
  private queue: AsyncFunction[] = [];
  private processing = false;

  run = async () => {
    if (this.queue.length === 0 || this.processing) return;

    this.processing = true;

    const fn = this.queue.shift();

    if (fn) {
      try {
        await fn();
      } catch (error) {
        console.error("PromiseQueue error:", error);
        throw error;
      }
    }

    this.processing = false;
    this.run();
  };

  enqueue = (fn: AsyncFunction) => {
    this.queue.push(fn);
  };
}
