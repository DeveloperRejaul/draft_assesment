import { s as sz , vs as v} from 'react-native-size-matters';

export function s(size: number): number {
  return sz(size)
}

export function vs(size: number): number {
  return v(size)
}