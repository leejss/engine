import PromiseQueue from "./PromiseQueue";
import { describe, beforeEach, test, expect, vi, afterEach } from "vitest";

describe("PromiseQueue", () => {
  let queue: PromiseQueue;

  beforeEach(() => {
    queue = new PromiseQueue();
  });

  afterEach(() => {
    queue = new PromiseQueue();
  });

  test("should run functions in the order they are enqueued", async () => {
    const results: number[] = [];
    queue.enqueue(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      results.push(1);
    });

    queue.enqueue(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      results.push(2);
    });

    queue.run();

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(results).toEqual([1, 2]);
  });
});
