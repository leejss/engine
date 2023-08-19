import EventEmitter from "./EventEmitter"; // Adjust the path accordingly
import { describe, beforeEach, test, expect, vi } from "vitest";

describe("EventEmitter", () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test("on - register an event", () => {
    const handler = vi.fn();
    emitter.on("testEvent", handler);
    emitter.emit("testEvent");
    expect(handler).toHaveBeenCalled();
  });

  test("once - handler should be called only once", () => {
    const handler = vi.fn();
    emitter.once("testEvent", handler);
    emitter.emit("testEvent");
    emitter.emit("testEvent");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("off - remove handler from event", () => {
    const handler = vi.fn();
    emitter.on("testEvent", handler);
    emitter.off("testEvent", handler);
    emitter.emit("testEvent");
    expect(handler).not.toHaveBeenCalled();
  });

  test("emit - trigger an event with payload", () => {
    const handler = vi.fn();
    emitter.on("testEvent", handler);
    emitter.emit("testEvent", { data: "test" });
    expect(handler).toHaveBeenCalledWith({ data: "test" });
  });

  test("emit - error if no registered event", () => {
    expect(() => emitter.emit("nonexistentEvent")).toThrow("No registered event");
  });

  test("clear - clear all events", () => {
    const handler = vi.fn();
    emitter.on("testEvent1", handler);
    emitter.on("testEvent2", handler);
    emitter.clear();
    expect(emitter.size).toBe(0);
  });
});
