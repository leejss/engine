// Define type for running and subscription
interface Running {
  execute: () => void;
  dependencies: Set<Set<Running>>;
}

// Define the context
const context: Running[] = [];

// subscribe function
function subscribe(running: Running, subscriptions: Set<Running>): void {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}

// createSignal function
export function createSignal<T>(value: T): [() => T, (newValue: T) => void] {
  const subscriptions: Set<Running> = new Set();

  const read = (): T => {
    const running = context[context.length - 1];
    if (running) {
      subscribe(running, subscriptions);
    }
    return value;
  };

  const write = (newValue: T): void => {
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
    value = newValue;
  };

  return [read, write];
}

// cleanup function
function cleanup(running: Running): void {
  for (const dep of running.dependencies) {
    dep.delete(running);
  }
  running.dependencies.clear();
}

// createEffect function
export function createEffect(fn: () => void): void {
  const execute = (): void => {
    cleanup(running);
    context.push(running);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

  const running: Running = {
    execute,
    dependencies: new Set(),
  };

  execute();
}
