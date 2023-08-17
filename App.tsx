import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";

import MainScreen from "./src/App/Index";
import Login from "./src/App/Login/Index";
import { ThemeContext } from "./src/App/Style/ThemeContext";
import reduxStore from "./src/storage/reduxStore";
import UserStorage from "./src/storage/UserStorage";

const App = () => {
  const isLogged = useSelector(UserStorage.isUserLoggedInSelector);
  const isUserDataLoading = useSelector(UserStorage.isUserDataLoadingSelector);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    UserStorage.loadUserDataOnStartUp();
  }, [isUserDataLoading]);

  useEffect(() => {
    if (isUserDataLoading) setShowImage(true);
    else
      setTimeout(() => {
        setShowImage(false);
      }, 1000);
  }, [isUserDataLoading]);

  if (showImage)
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
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  // <Spinner visible={true} textContent={"Loading..."} />;
  // if (isUserDataLoading) return <Spinner visible={true} textContent={"Loading..."} />;
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
