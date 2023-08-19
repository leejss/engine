import { EventEmitter } from "../EventEmitter";

type Handler = <T>(data: T) => void;
type StreamSignal = "data" | "end";

export default class Stream {
  private eventEmitter: EventEmitter;
  constructor(eventEmitter?: EventEmitter) {
    this.eventEmitter = eventEmitter || new EventEmitter();
  }
  get core() {
    return this.eventEmitter;
  }
  on = (signal: StreamSignal, handler: Handler) => {
    this.eventEmitter.on(signal, handler);
  };

  write = <T>(payload: T) => {
    this.eventEmitter.emit("data", payload);
  };
  end = () => {
    this.eventEmitter.emit("end");
  };
}
