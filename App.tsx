import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";

import MainScreen from "./src/App/Index";
import Login from "./src/App/Login/Index";
import { ThemeContext } from "./src/App/Style/ThemeContext";
import reduxStore from "./src/storage/reduxStore";
import UIStore from "./src/storage/UIStore";
import UserStorage from "./src/storage/UserStorage";
import UIStore from "./src/storage/UIStore";
import Spinner from "react-native-loading-spinner-overlay";

const Tab = createBottomTabNavigator();

const AppWrapper = () => (
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

const App = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  console.log(DarkTheme);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    UserStorage.getUserToken().then(res => {
      let token = null;
      let privKey = null;

      token = res ? res.token : null;
      privKey = res ? res.privKey : null;

      if (token != null && privKey != null) {
        UserStorage.setUserToken(token, privKey);
        UserStorage.getUserProfile().then(res => {
          if (res) {
            UserStorage.setUserProfile(res);
          }
        });
      }
    });
  }, []);

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
  const isDarkModeContext = React.useState(false);

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
