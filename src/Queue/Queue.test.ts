import { describe, expect, test, beforeEach } from "vitest";
import Queue from "./Queue";

describe("Queue<T>", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test("should initialize as empty", () => {
    expect(queue.isEmpty()).toBe(true);
  });

  test("should enqueue items", () => {
    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
    expect(queue.size()).toBe(1);
  });

  test("should dequeue items", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.peek()).toBe(2);
    expect(queue.size()).toBe(1);
  });

  test("should return null when dequeueing from an empty queue", () => {
    expect(queue.dequeue()).toBeNull();
  });

  test("should return null when peeking an empty queue", () => {
    expect(queue.peek()).toBeNull();
  });

  test("should return the correct size", () => {
    expect(queue.size()).toBe(0);
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
    queue.dequeue();
    expect(queue.size()).toBe(1);
  });
});
