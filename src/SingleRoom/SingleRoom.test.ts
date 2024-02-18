import { expect, it, describe, vi } from "vitest";
import { SingleRoom } from "./SingleRoom";

describe("SingleRoom test", () => {
  it("should handle only one task at a time", () => {
    const toastRoom = new SingleRoom();
    let called = 0;

    // showing and hiding toast takes 3s
    const toast = () => {
      called += 1;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    };

    toastRoom.add(toast);
    toastRoom.add(toast);
    toastRoom.add(toast);
    toastRoom.add(toast);
    toastRoom.add(toast);
    toastRoom.add(toast);

    expect(toastRoom.isEmpty()).toBe(false);
    expect(called).toBe(1);
  });

  it("should await added task", async () => {
    const toastRoom = new SingleRoom();
    let called = 0;

    // showing and hiding toast takes 3s
    const toast = () => {
      called += 1;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    };

    await toastRoom.awaitableAdd(toast);
    await toastRoom.awaitableAdd(toast);

    expect(called).toBe(2);
  });
});
