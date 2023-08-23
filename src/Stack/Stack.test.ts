import Stack from "./Stack";
import { describe, beforeEach, test, expect } from "vitest";

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  test("is initially empty", () => {
    expect(stack.isEmpty()).toBe(true);
  });

  test("can push to stack", () => {
    stack.push(5);
    expect(stack.size).toBe(1);
  });

  test("can pop from stack", () => {
    stack.push(5);
    stack.push(10);
    expect(stack.pop()).toBe(10);
    expect(stack.size).toBe(1);
  });

  test("can peek at the top of the stack", () => {
    stack.push(5);
    stack.push(10);
    expect(stack.peek()).toBe(10);
    expect(stack.size).toBe(2); // Peek doesn't remove the element
  });

  test("pop from an empty stack returns undefined", () => {
    expect(stack.pop()).toBeUndefined();
  });

  test("peek on an empty stack returns undefined", () => {
    expect(stack.peek()).toBeUndefined();
  });
});
