import { createMMKV } from 'react-native-mmkv'

export const s = createMMKV()

export type StorageKey = 
  "language" 
  |'user_token' 
  |'user'
  
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