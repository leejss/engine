import { describe, it, expect, vi } from "vitest";
import { memoizePromise } from ".";

describe("memoizeAsync", () => {
  it("should cache promise results", async () => {
    const asyncfn = vi.fn(async (x) => x + 2);

    const memoized = memoizePromise(asyncfn);
    const result1 = await memoized(2);
    const result2 = await memoized(2);

    expect(result1).toBe(4);
    expect(result2).toBe(4);

    expect(asyncfn).toHaveBeenCalledTimes(1);
  });
  it("should handle cache expiration", async () => {
    const asyncfn = vi.fn(async (x) => x + 2);
    const memoized = memoizePromise(asyncfn, { expirationTime: 1000 });

    await memoized(2);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    await memoized(2);
    expect(asyncfn).toHaveBeenCalledTimes(2);
  });

  it("should respect cache size limit", async () => {
    const mockFunction = vi.fn(async (x: number) => x * 2);
    const memoizedFunction = memoizePromise(mockFunction, { cacheSize: 1 });

    await memoizedFunction(2);
    await memoizedFunction(3); // This should evict the cache for '2'
    await memoizedFunction(2);

    expect(mockFunction).toHaveBeenCalledTimes(3);
  });

  it("should return correct result", async () => {
    const asyncfn = vi.fn(async (x) => x + 2);
    const memoized = memoizePromise(asyncfn);

    const result1 = await memoized(2);
    const result2 = await memoized(4);

    expect(result1).toBe(4);
    expect(result2).toBe(6);

    expect(asyncfn).toHaveBeenCalledTimes(2);
  });
});
