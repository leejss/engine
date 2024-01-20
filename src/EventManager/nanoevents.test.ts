import { createNanoEvents } from "nanoevents";
import { describe, expect, it } from "vitest";

describe("nanoevents", () => {
  it("should get value from promise", () => {
    const emitter = createNanoEvents();
    new Promise((resolve) => {
      emitter.on("data", resolve);
    }).then((data) => {
      expect(data).toBe("test");
    });
    emitter.emit("data", "test");
  });

  it("should get value from promise", async () => {
    const emitter = createNanoEvents();
    const promise = new Promise((resolve) => {
      emitter.on("data", resolve);
    });
    emitter.emit("data", "test");
    const value = await promise;
    expect(value).toBe("test");
  });
});

// Execution order of asynchronous codes

// Promise creation is synchronous
// But, the callback function passed to the Promise constructor is executed asynchronously
// Meaning, the callback function is executed after the current call stack is empty

// Event loop and call stack

// How to make things non blocking?
