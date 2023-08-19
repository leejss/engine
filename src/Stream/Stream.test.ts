import Stream from "./Stream";
import { describe, beforeEach, test, expect, vi } from "vitest";

describe("Stream", () => {
  let stream: Stream;

  beforeEach(() => {
    stream = new Stream();
  });

  test("should on data", () => {
    stream.on("data", (data) => {
      console.log(data);
    });
    stream.on("data", (data) => {
      console.log(data);
    });

    expect(stream.core.size("data")).toBe(2);
  });

  test("should write data", () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();

    stream.on("data", cb1);
    stream.on("data", cb2);

    stream.write("hello");

    expect(cb1).toHaveBeenCalledOnce();
    expect(cb2).toHaveBeenCalledOnce();
  });
});
