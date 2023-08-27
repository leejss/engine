import { describe, expect, test } from "vitest";
import BasicMiddlewareEngine, { NextFn, Request, Response } from "./BasicMiddlewareEngine";

describe("BasicMiddlewareEngine", () => {
  test("should run all middlewares", () => {
    const req = {
      value: 0,
    };

    const middleware1 = (req: Request, res: Response, next: NextFn) => {
      req.value += 1;
      next();
    };
    const middleware2 = (req: Request, res: Response, next: NextFn) => {
      req.value += 1;
      next();
    };

    const engine = new BasicMiddlewareEngine([middleware1, middleware2]);
    engine.run(req, {});

    expect(req.value).toBe(2);
  });
});
