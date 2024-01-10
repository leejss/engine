import { describe, it, expect, vi } from "vitest";
import { Port } from "./Port";

describe("Port", () => {
  it("should be able to send a message", () => {
    const port = new Port();
    const message = { foo: "bar" };
    port.onMessage.addListener((msg) => {
      expect(msg).toEqual(message);
    });
    port.postMessage(message);
  });

  it("should be able to disconnect", () => {
    const port = new Port();
    const listener = vi.fn();
    port.onDisconnect.addListener(listener);
    port.disconnect();
    expect(listener).toHaveBeenCalled();
  });

  it("should be able to connect", () => {
    const port = new Port();
    const listener = vi.fn();
    port.onConnect.addListener(listener);
    port.connect();
    expect(listener).toHaveBeenCalled();
  });
});
