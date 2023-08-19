import MessageQueue from "./MessageQueue"; // Adjust the path accordingly
import { describe, beforeEach, test, expect, vi } from "vitest";

describe("MessageQueue", () => {
  let mq: MessageQueue<number>;

  beforeEach(() => {
    mq = new MessageQueue<number>();
  });

  test("enqueue single item", () => {
    mq.enqueue(1);
    expect(mq.size()).toBe(1);
  });

  test("enqueue multiple items", () => {
    mq.enqueue([1, 2, 3]);
    expect(mq.size()).toBe(3);
  });

  test("dequeue item", () => {
    mq.enqueue([1, 2]);
    expect(mq.dequeue()).toBe(1);
    expect(mq.size()).toBe(1);
  });

  test("subscribe and notify", () => {
    const callback = (message: number) => {
      expect(message).toBe(1);
    };
    mq.subscribe(callback);
    mq.enqueue(1);
  });

  test("should notify subscribers", () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    mq.subscribe(cb1);
    mq.subscribe(cb2);
    mq.enqueue(1);
    expect(cb1).toHaveBeenCalledWith(1);
    expect(cb2).toHaveBeenCalledWith(1);
  });

  test("unsubscribe", () => {
    const callback = vi.fn();
    mq.subscribe(callback);
    mq.unsubscribe(callback);
    mq.enqueue(1);
    expect(callback).not.toHaveBeenCalled();
  });

  test("maxSize property", () => {
    const limitedQueue = new MessageQueue<number>(2);
    limitedQueue.enqueue(1);
    limitedQueue.enqueue(2);
    expect(() => limitedQueue.enqueue(3)).toThrow("Queue is full");
  });

  test("isEmpty method", () => {
    expect(mq.isEmpty()).toBe(true);
    mq.enqueue(1);
    expect(mq.isEmpty()).toBe(false);
  });

  test("clear method", () => {
    mq.enqueue([1, 2, 3]);
    mq.clear();
    expect(mq.size()).toBe(0);
  });
});
