import { describe, it, expect, vi } from "vitest";
import { AsyncTask } from "./AsyncTask";

describe("AsyncTask Test", () => {
  it("should return Success type when a promise is resolved", async () => {
    const asyncTask = async () => {
      return "success";
    };
    const success = await AsyncTask(asyncTask);
    expect(success.type === "success").toBe(true);
    // real http request
    // const asyncTask2 = async () => {
    //   return fetch("https://jsonplaceholder.typicode.com/posts");
    // };
    // const json = () => asyncTask2().then((res) => res.json());
    // const success2 = await AsyncTask(json);
    // expect(success2.type === "success").toBe(true);
  });

  it("should return Fail type when a promise is rejected", async () => {
    const asyncTask = async () => {
      throw new Error("fail");
    };
    const fail = await AsyncTask(asyncTask);
    expect(fail.type === "fail").toBe(true);
  });

  it("should not throw error", async () => {
    const errorTask = async () => {
      throw new Error("error");
    };

    const mockFn = vi.fn();

    try {
      const error = await AsyncTask(errorTask);
      expect(error.type === "fail").toBe(true);
    } catch (error) {
      mockFn();
    }

    expect(mockFn).not.toBeCalled();
  });

  it("should handle conditionally based on the type", async () => {
    let result = "";
    const asyncTask = async () => {
      return "hello";
    };
    const taskResult = await AsyncTask(asyncTask);
    if (taskResult.type === "success") {
      result = "hello";
      expect(taskResult.value).toBe("hello");
    } else {
      result = "world";
    }

    expect(result).toBe("hello");
  });
});
