import { AsyncLocalStorage } from 'async_hooks';

export interface Context {
  userId?: string;
}

const asyncLocalStorage = new AsyncLocalStorage<Context>();

export class RequestContext {
  static run(callback: () => void) {
    asyncLocalStorage.run({}, callback);
  }

  static setUserId(userId: string) {
    const store = asyncLocalStorage.getStore();
    if (store) {
      store.userId = userId;
    }
  }

  static getUserId(): string | undefined {
    return asyncLocalStorage.getStore()?.userId;
  }
}
