import { NavigationContainer, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";

import MainScreen from "./src/App/Index";
import Login from "./src/App/Login/Index";
import reduxStore from "./src/storage/reduxStore";
import UIStore from "./src/storage/UIStore";
import UserStorage from "./src/storage/UserStorage";
import { ThemeContext } from "./src/App/Style/ThemeContext";

const App = () => {
  const isLogged = useSelector(UserStorage.isUserLoggedInSelector);
  const showLoadingOverlay = useSelector(UIStore.isLoadingUIVisibleSelector);
  const isUserDataLoading = useSelector(UserStorage.isUserDataLoadingSelector);

  useEffect(() => {
    UserStorage.loadUserDataOnStartUp();
  }, [isUserDataLoading]);

  return (
    <>
      <Spinner visible={showLoadingOverlay} textContent={"Loading..."} />
      {isLogged || isUserDataLoading ? <MainScreen /> : <Login />}
    </>
  );
};

const AppWrapper = () => {
  const theme = useTheme();
  const isDarkModeContext = React.useState(false);

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider store={reduxStore}>
          <ThemeContext.Provider value={isDarkModeContext}>
            <NavigationContainer theme={theme}>
              <App />
            </NavigationContainer>
          </ThemeContext.Provider>
        </Provider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

export default AppWrapper;
