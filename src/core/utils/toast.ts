import Toast from 'react-native-simple-toast';

export function showToast (message:string) {
  Toast.show(message, Toast.LONG)
}