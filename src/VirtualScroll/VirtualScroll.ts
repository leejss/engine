import { createNanoEvents } from "nanoevents";

type Callback = (...args: any[]) => void;

export const createVirtualScroll = (element: HTMLElement) => {
  const wheelMultiplier = 1;
  const emitter = createNanoEvents();
  const onWheel = (event: WheelEvent) => {
    let { deltaX, deltaY } = event;
    deltaX *= wheelMultiplier;
    deltaY *= wheelMultiplier;
    emitter.emit("scroll", event.deltaY);
  };
  const on = (event: string, cb: Callback) => {
    emitter.on(event, cb);
  };

  element.addEventListener("wheel", onWheel);

  return {
    on,
  };
};
