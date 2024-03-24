import { EventEmitter } from "node:events";
import { Duplex } from "node:stream";
import { describe, expect, it } from "vitest";

describe("group", () => {
  it("Event handlers should run on the async context? or sync context? ", () => {
    const emitter = new EventEmitter();
    let result;

    emitter.on("testEvent", (data) => {
      result = data;
    });

    emitter.emit("testEvent", "hello world");
    expect(result).toBe("hello world");
  });

  it("should", () => {
    const duplex = new Duplex({
      objectMode: true,
      read() {},
    });

    let result;
    duplex.on("data", (data) => {
      result = data;
    });

    duplex.push("hello world");
    expect(result).toBe(undefined);
  });
});
