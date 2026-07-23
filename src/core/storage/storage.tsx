import { createMMKV } from 'react-native-mmkv'

export const s = createMMKV()

export type StorageKey = 
  "language" 
  |'user_token' 
  |'user'
  


export const Storage = {
  getItem: async (key: string) => {
    return s.getString(key) ?? null;
  },

  setItem: async (key: string, value: string) => {
    s.set(key, value);
  },

  removeItem: async (key: string) => {
    s.remove(key);
  },
};
export default class storage {
  static getItem (key:StorageKey ) {
    try {
      return s.getString(key);
    } catch (error) {
      console.log(error);
    }
  }

  static setItem (key:StorageKey, value:string) {
    try {
      return s.set(key, value)
    } catch (error) {
      console.log(error);
    }
  }

  static removeItem (key:StorageKey) {
    try {
      return s.remove(key);
    } catch (error) {
      console.log(error);
    }
  }

  static clear () {
    try {
      return s.clearAll()
    } catch (error) {
      console.log(error);
    }
  }
  static getAllKeys () {
    return s.getAllKeys()
  }
}