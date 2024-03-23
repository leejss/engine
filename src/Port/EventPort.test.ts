import { describe, it, expect } from "vitest";
import { EventPort } from "./EventPort";

describe("EventPort", () => {
  it("should emit 'message' event when postMessage is called", () => {
    const eventPort = new EventPort();
    const message = "Hello, world!";
    let receivedMessage: any;

    // Add a listener to the "message" event
    eventPort.on("message", (msg) => {
      receivedMessage = msg;
    });

    // Port can post messages
    eventPort.postMessage(message);
    expect(receivedMessage).toBe(message);
  });

  it("should bridge two ports using the port API", () => {
    // Two ports
    const port1 = new EventPort();
    const port2 = new EventPort();

    let receivedMessage: any;

    // Add a listener to the "message" event
    port2.on("message", (msg) => {
      // Port2 receives the message
      receivedMessage = msg;
    });

    // Bridge two ports
    port1.on("message", (msg) => {
      // Port1 forwards the message to port2
      port2.postMessage(msg);
    });

    const message = "Hello, world!";
    port1.postMessage(message);
    expect(receivedMessage).toBe(message);
  });

  it("should build background bridge commnuication system", () => {
    const backgroundBridgePort = new EventPort();
    const clientPort = new EventPort();

    // client send the msg to background
    // and background handle the msg and send the response back to client

    let receivedMessage: any;
    let responseMessage: any;

    // Add a listener to the "message" event
    backgroundBridgePort.on("message", (msg) => {
      // Background receives the message
      receivedMessage = msg;

      // Background sends the response back to the client
      clientPort.postMessage("Response from background");
    });

    // Add a listener to the "message" event

    clientPort.on("message", (msg) => {
      // Client receives the response
      responseMessage = msg;
    });

    const message = "Hello, world!";

    // client send the message to background
    backgroundBridgePort.postMessage(message);

    // background sends the response back to client

    expect(receivedMessage).toBe(message);
    expect(responseMessage).toBe("Response from background");
  });

  it("should build background bridge commnuication system with operations", () => {
    const mathBridgePort = new EventPort();
    const clientPort = new EventPort();

    // client send the msg to background
    // and background handle the msg and send the response back to client

    let result: any;

    // Add a listener to the "message" event
    mathBridgePort.on("message", (msg: number) => {
      // Background receives the message
      const response = msg + 1;

      // Background sends the response back to the client
      clientPort.postMessage(response);
    });

    // Add a listener to the "message" event

    clientPort.on("message", (msg: number) => {
      // Client receives the response
      result = msg;
    });

    const message = 1;

    // client send the message to background
    mathBridgePort.postMessage(message);

    // background sends the response back to client

    expect(result).toBe(2);
  });
});
