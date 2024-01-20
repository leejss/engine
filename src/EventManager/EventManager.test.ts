import { describe, it, expect } from "vitest";
import { EventManager } from "./EventManager";

describe("EventManager", () => {
  it("should get value from the promise", () => {
    const eventManager = EventManager.getInstance();
    eventManager.wait("data").then((value) => {
      expect(value).toBe("test");
    }); // wait returns a promise
    eventManager.emit("data", "test");
  });

  it("should get value from the async", async () => {
    const eventManager = EventManager.getInstance();
    const promise = eventManager.wait("data");
    eventManager.emit("data", "test");
    const value = await promise;
    expect(value).toBe("test");
  });
});
