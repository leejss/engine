import { Either, fail, success } from "../Either";
// AsyncTask handle a async task. Async task is a function that returns a promise.
// AsyncTask return Either type. If the task is successful, it returns Success type with the value.

type Task<T> = () => Promise<T>;
export const AsyncTask = async <T>(
  task: Task<T>,
): Promise<Either<T, Error>> => {
  try {
    const result = await task();
    return success(result);
  } catch (error) {
    if (error instanceof Error) {
      return fail(error);
    }
    throw error;
  }
};
