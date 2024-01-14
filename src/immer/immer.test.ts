import { produce } from "immer";
import { describe, it, expect } from "vitest";

describe("immer test", () => {
  it("test without immer", () => {
    const baseState = [
      {
        todo: "Learn typescript",
      },
      {
        todo: "Try immer",
      },
    ];
    const newState = [...baseState];

    // Same object reference
    expect(newState[0]).toBe(baseState[0]);
  });
  it("test immutable update of array structure", () => {
    const baseState = [
      {
        todo: "Learn typescript",
      },
      {
        todo: "Try immer",
      },
    ];

    const nextState = produce(baseState, (draftState) => {
      draftState[1].todo = "Try immer again";
    });
    baseState[1].todo = "Try immer again";
    expect(nextState[1]).not.toBe(baseState[1]);
  });
  it("test immutable update of object structure", () => {
    const baseState = {
      todos: [
        {
          title: "Learn typescript",
        },
      ],
    };

    const newState = produce(baseState, (draft) => {
      draft.todos[0].title = "Learn typescript again";
    });

    baseState.todos[0].title = "Learn typescript again";

    // Compare object reference
    expect(newState.todos[0]).not.toBe(baseState.todos[0]);
  });
  it("test curried produce", () => {
    type Todo = {
      id: number;
      title: string;
      done: boolean;
    };
    const base: Todo[] = [
      {
        id: 1,
        title: "Learn typescript",
        done: false,
      },
    ];
    const recipe = (draftState: Todo[], id: number) => {
      const todo = draftState.find((todo) => todo.id === id);
      if (todo) {
        todo.done = !todo.done;
      }
    };
    const toggleTodo = produce(recipe);
    const nextState = toggleTodo(base, 1);

    expect(nextState[0].done).toBe(true);
  });
});
