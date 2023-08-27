export interface Request {
  [key: string]: any;
}
export interface Response {
  [key: string]: any;
}

export type NextFn = () => void;
export type MiddlewareFn = (req: Request, res: Response, next: NextFn) => void;

export default class BasicMiddlewareEngine {
  private middlewares: MiddlewareFn[] = [];

  constructor(middlewares: MiddlewareFn[]) {
    this.middlewares = middlewares;
  }

  use = (fn: MiddlewareFn) => {
    this.middlewares.push(fn);
  };

  run = (req: Request, res: Response) => {
    let index = 0;

    // ! Inner next function will remember outside scope
    const next = () => {
      // ! index in next function will refer to the updated index
      if (index < this.middlewares.length) {
        const fn = this.middlewares[index];

        // ! Update index value outside scope
        index++;

        // ! Calling next middleware
        fn(req, res, next);
      }
    };

    next();
  };
}
