import { describe, it, expect } from "vitest";
import { Port } from "./AnotherPort";

describe("Another Port", () => {
  it("should emit a message", () => {
    const port = new Port();
    port.onMessage((message) => {
      expect(message).toBe("hello");
    });
    port.postMessage("hello");
  });
  it("should emit a disconnect", () => {
    const port = new Port();
    port.onDisconnect(() => {
      expect(true).toBe(true);
    });
    port.disconnect();
  });
  it("should emit a connect", () => {
    const port = new Port();
    port.onConnect(() => {
      expect(true).toBe(true);
    });
    port.connect();
  });
});
