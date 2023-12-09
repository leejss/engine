import ky, { KyInstance, Options } from "ky";

type CustomKyConfig = {
  baseURL: string;
  defaultHeaders: HeadersInit;
};

type ClientConfig = { name: string } & CustomKyConfig;

const createKyInstance = (config: CustomKyConfig): KyInstance =>
  ky.create({
    prefixUrl: config.baseURL,
    headers: config.defaultHeaders,
  });

// Configurable and extendable client
export const createBaseClient = ({ name, ...config }: ClientConfig) => {
  const kyInstance = createKyInstance(config);
  return {
    getClient: () => kyInstance,
    // Set function will change the existing ky instance
    set: (opt: Options) => {
      kyInstance.extend(opt);
    },
    extend: (opt: Options & { name: string }) => createBaseClient({ ...config, ...opt }),
  };
};
