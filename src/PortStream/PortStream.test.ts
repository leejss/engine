import { describe, it, expect } from "vitest";
import { PortStream } from "./PortStream";
import { Port } from "../Port";
import { Duplex } from "readable-stream";

describe("PortStream", () => {
  it("should be a Duplex stream", () => {
    const port = new Port();
    const portStream = new PortStream(port);
    expect(portStream).toBeInstanceOf(Duplex);
  });
  it("should write messages to the port", () => {
    const port = new Port();
    const portStream = new PortStream(port);
    port.onMessage.addListener((message) => {
      expect(message).toBe("hello");
    });
    portStream.write("hello");
  });
  it("should push messages from the port", () => {
    const port = new Port();
    const portStream = new PortStream(port);
    portStream.on("data", (message) => {
      expect(message).toBe("hello");
    });
    port.postMessage("hello");
  });
  it("should destroy the stream on disconnect", () => {
    const port = new Port();
    const portStream = new PortStream(port);
    portStream.on("close", () => {
      expect(portStream.destroyed).toBe(true);
    });
    port.disconnect();
  });

  it("should pipe messages from the port", () => {
    const port = new Port();
    const portStream = new PortStream(port);
    const source = new Duplex({
      objectMode: true,
      read() {},
      write(chunk, encoding, callback) {
        callback();
      },
    });
    source.pipe(portStream).pipe(source);
    port.onMessage.addListener((message) => {
      expect(message).toBe("hello");
    });
    source.push("hello");
  });
});
