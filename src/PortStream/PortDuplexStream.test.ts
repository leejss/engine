import { describe, expect, it } from "vitest";
import { EventPort } from "../Port/EventPort";
import { PortDuplexStream } from "./PortDuplexStream";

describe("PortDuplexStream", () => {
  it("should read data", () => {
    const port = new EventPort();
    const portStream = new PortDuplexStream({ port });

    // When port receive the message, it push the message to the readable stream.
    portStream.on("data", (msg) => {
      expect(msg).toBe("hello world");
    });

    const msg = "hello world";
    port.postMessage(msg);
  });

  it("should write data", () => {
    const portA = new EventPort();
    const portStreamA = new PortDuplexStream({ port: portA });

    const portB = new EventPort();
    const portStreamB = new PortDuplexStream({ port: portB });

    // When port receive the message, it push the message to the readable stream.
    portStreamA.pipe(portStreamB);

    portA.postMessage("hello world");
    portB.on("message", (msg) => {
      expect(msg).toBe("hello world");
    });
  });
});
