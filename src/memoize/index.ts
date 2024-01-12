type Fn = (...args: any[]) => any;
type AsyncFn = (...args: any[]) => Promise<any>;
type CacheOptions = {
  cacheSize?: number;
  expirationTime?: number;
};

export const memoize = <T extends Fn>(f: T) => {
  const cache = new Map();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, f(...args));
    }

    return cache.get(key);
  };
};

// Caching the result of an async function
export const memoizePromise = <T extends AsyncFn>(
  f: T,
  options: CacheOptions = {
    cacheSize: Infinity,
    expirationTime: Infinity,
  },
) => {
  const { cacheSize = Infinity, expirationTime = Infinity } = options;
  const cache = new Map<
    string,
    {
      promise: ReturnType<T>;
      timestamp: number;
    }
  >();

  const clean = () => {
    while (cache.size > cacheSize || (cache.size > 0 && Date.now() - cache.values().next().value.timestamp > expirationTime)) {
      cache.delete(cache.keys().next().value); // Remove the oldest entry
    }
  };

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < expirationTime) {
      return cached.promise;
    }

    const promise = f(...args).then((value) => {
      clean();
      return value;
    }) as ReturnType<T>;

    cache.set(key, {
      promise,
      timestamp: Date.now(),
    });

    return promise;
  };
};
