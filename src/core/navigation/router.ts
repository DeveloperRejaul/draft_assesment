import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { type RootStackParamsList } from './types';

export type RouteType = keyof RootStackParamsList

export const navigationRef = createNavigationContainerRef();

export class router {
  static push<RouteName extends keyof RootStackParamsList>(name: RouteName, params?: RootStackParamsList[RouteName]) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  }

  static reset<RouteName extends keyof RootStackParamsList>(name: RouteName, params?: RootStackParamsList[RouteName]){
    if (navigationRef.isReady()) {
      navigationRef.reset({index: 0, routes: [{name, params}]});
    }
  }

  static pop() {
    return this.withPop()
  }

  static withPop () {
    if(navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.pop());
    }
  }

  static navigate<RouteName extends keyof RootStackParamsList>(name: RouteName, params?: RootStackParamsList[RouteName]) {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(name, params);
    }
  }

  static back() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }

  static canBack () {
    return navigationRef.canGoBack()
  }

  static replace<RouteName extends keyof RootStackParamsList>(name: RouteName, params?: RootStackParamsList[RouteName]) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }

  static current(){
    if (!navigationRef.isReady()) return undefined;
    const state = navigationRef.getState();
    return state.routes[state.routes.length-1]?.name
  }
}
  