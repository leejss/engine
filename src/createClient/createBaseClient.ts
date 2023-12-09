import ky, { KyInstance, Options } from "ky";

type BaseConfig = {
  baseURL?: Options["prefixUrl"];
  headers?: Options["headers"];
};

const BASE_URL = process.env.BASE_URL as string;

export function createBaseClient({ baseURL = BASE_URL, headers = {} }: BaseConfig): KyInstance {
  const instance = ky.create({
    prefixUrl: baseURL,
    headers: {
      ...headers,
    },
  });
  return instance;
}
