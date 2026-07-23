import { Alert } from "react-native";

interface IShowNativeAlertParams {
    title:string;
    body:string;
    onOk?: ()=> void
}


export function showNativeAlert({title, body, onOk}:IShowNativeAlertParams) {
  Alert.alert(title, body, [{
    text: "No",
    onPress: () => {},
    style: "cancel",
  },
  {
    text: "Yes",
    onPress: () => {
      onOk?.()
    },
  },
  ],
  { cancelable: false }
  );
  return true;
};