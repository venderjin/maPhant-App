import { NavigationContainer, useTheme } from "@react-navigation/native";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";

import MainScreen from "./src/App/Index";
import Login from "./src/App/Login/Index";
import reduxStore from "./src/storage/reduxStore";
import UIStore from "./src/storage/UIStore";
import UserStorage from "./src/storage/UserStorage";

const App = () => {
  const isLogged = useSelector(UserStorage.isUserLoggedInSelector);
  const showLoadingOverlay = useSelector(UIStore.isLoadingUIVisibleSelector);

  return (
    <>
      <Spinner visible={showLoadingOverlay} textContent={"Loading..."} />
      {isLogged ? <MainScreen /> : <Login />}
    </>
  );
};

const AppWrapper = () => {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider store={reduxStore}>
          <NavigationContainer theme={theme}>
            <App />
          </NavigationContainer>
        </Provider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

export default AppWrapper;
