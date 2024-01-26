export type Success<T> = { type: "success"; value: T };
export type Fail<E> = { type: "fail"; error: E };
export type Either<T, E> = Success<T> | Fail<E>;

export const success = <T>(value: T): Either<T, never> => ({ type: "success", value });
export const fail = <E>(error: E): Either<never, E> => ({ type: "fail", error });
