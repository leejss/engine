import EventEmitter from "eventemitter3";
import { Duplex } from "readable-stream";

interface Port extends EventEmitter {
  postMessage: (message: any) => void;
  disconnect: () => void;
}

export class PortDuplexStream extends Duplex {
  port: Port;
  constructor({ port }: { port: Port }) {
    super({
      objectMode: true,
    });

    this.port = port;
    this.port.addListener("message", this._onMessage); // port receive the message
    this.port.addListener("disconnect", this._onDisconnect);
  }

  _onMessage = (message: any) => {
    // when port receive the message, push the message to the readable stream. This will emit the 'data' event internally.
    this.push(message);
  };

  _onDisconnect = () => {
    this.destroy();
  };

  _read(size?: number | undefined): void {
    // Do nothing
    return undefined;
  }

  _write(
    msg: any,
    encoding: string,
    callback: (error?: Error | null | undefined) => void,
  ): void {
    // when stream write the message, post the message to the port
    this.port.postMessage(msg);
    callback();
  }
}
