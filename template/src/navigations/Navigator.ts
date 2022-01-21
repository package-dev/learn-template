import { createRef } from "react";
import { CommonActions, NavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createRef<NavigationContainerRef>(null);

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function navigateAndReset(routes = [], index = 0) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  );
}

export function navigateAndSimpleReset(name: string, index = 0) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes: [{ name }],
    }),
  );
}

export function goback() {
  navigationRef.current?.goBack();
}

export function replaceScreen(name: string, params?: any, screen = 1) {
  navigationRef.current?.dispatch((state: any) => {
    if (state.routes?.length > screen) {
      return CommonActions.reset({
        ...state,
        routes: [
          ...state.routes.slice(0, -screen),
          {
            name,
            params,
          },
        ],
        index: state.routes.length - screen,
      });
    } else {
      navigationRef.current?.navigate(name, params);
    }
  });
}
