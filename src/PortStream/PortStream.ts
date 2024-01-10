import { Duplex } from "readable-stream";
import type { Port } from "../Port";

export class PortStream extends Duplex {
  _port: Port;
  constructor(port: Port) {
    super({
      objectMode: true,
    });
    this._port = port;
    // setup

    this._port.onMessage.addListener(this._onMessage);
    this._port.onDisconnect.addListener(this._onDisconnect);
  }

  _read(): void {
    return undefined;
  }

  _write(chunk: any, encoding: string, callback: (error?: Error | null | undefined) => void): void {
    this._port.postMessage(chunk);
    callback();
  }

  _onMessage = (message: any) => {
    this.push(message);
  };

  _onDisconnect = () => {
    this.destroy();
  };
}
