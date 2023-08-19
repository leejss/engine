import { EventEmitter } from "../EventEmitter";

type Handler = <T>(data: T) => void;
type DataSignal = "data";
type FixedSignal = "end";

export default class Stream<Signal = DataSignal> {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter?: EventEmitter) {
    this.eventEmitter = eventEmitter || new EventEmitter();
  }

  get core() {
    return this.eventEmitter;
  }
  on = (signal: Signal | FixedSignal, handler: Handler) => {
    this.eventEmitter.on(signal as string, handler);
  };

  write = <T>(payload: T) => {
    this.eventEmitter.emit("data", payload);
  };
  end = () => {
    this.eventEmitter.emit("end");
  };
}
