import EventEmitter from "eventemitter3";

// Port is messaging interface that can be used to communicate between different parts of the application.

// If two apps want to communicate with each other, they can use the Port class to send and receive messages.

// Event: message
// Send and receive messages between different parts of the application.

// Send message: postMessage
// Receive message: on("message", (message) => { ... })

export class EventPort extends EventEmitter {
  constructor() {
    super();
  }

  // Port can post messages
  postMessage = (message: any) => {
    this.emit("message", message);
  };

  // Port can disconnect
  disconnect = () => {
    this.emit("disconnect");
  };
}
