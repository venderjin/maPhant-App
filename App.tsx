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
import { View, Image } from "react-native";

const App = () => {
  const isLogged = useSelector(UserStorage.isUserLoggedInSelector);
  const showLoadingOverlay = useSelector(UIStore.isLoadingUIVisibleSelector);
  const isUserDataLoading = useSelector(UserStorage.isUserDataLoadingSelector);

  useEffect(() => {
    UserStorage.loadUserDataOnStartUp();
  }, [isUserDataLoading]);

  if (isUserDataLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Image
          source={require("./assets/maphant_logo_eng.jpeg")}
          style={{ resizeMode: "contain" }}
        ></Image>
      </View>
    );
  // <Spinner visible={true} textContent={"Loading..."} />;

  if (isUserDataLoading) return <Spinner visible={true} textContent={"Loading..."} />;

  return <>{isLogged || isUserDataLoading ? <MainScreen /> : <Login />}</>;
};

const AppWrapper = () => {
  const isDarkModeContext = React.useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <RootSiblingParent>
          <SafeAreaProvider>
            <Provider store={reduxStore}>
              <NavigationContainer theme={isDarkModeContext[0] ? DarkTheme : DefaultTheme}>
                <ThemeContext.Provider value={isDarkModeContext}>
                  <App />
                </ThemeContext.Provider>
              </NavigationContainer>
            </Provider>
          </SafeAreaProvider>
        </RootSiblingParent>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default AppWrapper;
