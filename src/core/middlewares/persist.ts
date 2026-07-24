import { type Middleware } from "zustic";
import storage, { type StorageKey } from "@src/core/storage/storage";

export const persist = <T extends object>(key:StorageKey): Middleware<T> => (_set, get) => (next) => (partial) => {
  next(partial);
  try {
    const state = get() as any;
    
    if(state.isInitializeing) return;
    
    storage.setItem(key, JSON.stringify({tasks: state.tasks || [], categories: state.categories || []}));
  } catch (error) {
    console.error('Failed to persist:', error);
  }
};
