import EventEmitter from "eventemitter3";

export class Port {
  _messages = new EventEmitter();

  onMessage(listener: (...args: any[]) => void) {
    this._messages.on("message", listener);
  }

  onDisconnect(listener: () => void) {
    this._messages.on("disconnect", listener);
  }

  postMessage(message: any) {
    this._messages.emit("message", message);
  }

  disconnect() {
    this._messages.emit("disconnect");
  }

  onConnect(listener: () => void) {
    this._messages.on("connect", listener);
  }

  connect() {
    this._messages.emit("connect");
  }
}
