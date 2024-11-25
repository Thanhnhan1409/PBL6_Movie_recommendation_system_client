
import { type AsyncLocalStorage } from "async_hooks";
import { requestAsyncStorage as asyncStorage } from "next/dist/client/components/request-async-storage";

function throwError(msg: string) {
  throw new Error(msg);
}

export function getRequestStorage<T>(): T {
  if ("getStore" in asyncStorage) {
    return (
      (asyncStorage as AsyncLocalStorage<any>).getStore() ??
      throwError("Couldn't get async storage")
    );
  }

  return asyncStorage as T;
}
