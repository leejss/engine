import { createNanoEvents } from "nanoevents";
// Event name and its handler
type EventPayload = {
  data: (data: string) => void;
};

// Singleton instance by using static instance
export class EventManager {
  private static instance: EventManager;
  private _emitter = createNanoEvents<EventPayload>();
  constructor() {}

  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  public wait<T extends keyof EventPayload>(eventName: T) {
    return new Promise<Parameters<EventPayload[T]>[0]>((resolve) => {
      const unbind = this._emitter.on(eventName, (data) => {
        unbind();
        resolve(data);
      });
    });
  }

  public emit<T extends keyof EventPayload>(eventName: T, ...data: Parameters<EventPayload[T]>) {
    this._emitter.emit(eventName, ...data);
  }
}
// https://chat.openai.com/c/c8f95da9-2699-4096-bb07-831e116f423a
