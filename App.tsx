import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";

// import { ThemeContext } from "styled-components";
import BoardListStack from "./src/App/Board/index";
import Home from "./src/App/Home/Index";
import Mail from "./src/App/Mail/Mail";
import Mypage from "./src/App/Mypage/Mypage";
import { ThemeContext } from "./src/App/Style/ThemeContext";
import reduxStore from "./src/storage/reduxStore";
import UserStorage from "./src/storage/UserStorage";

const Tab = createBottomTabNavigator();

const AppWrapper = () => (
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

const App = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  console.log(DarkTheme);
  // const [isLoadingComplete, setIsLoadingComplete] = useState(false);

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

  if (isLogged == false) {
    return (
      <ThemeContext.Provider value={[isDark, setIsDark]}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Home />
        </NavigationContainer>
      </ThemeContext.Provider>
    );
  }
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="홈"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="home" size={30} color="#5299EB" />,
          }}
        />
        <Tab.Screen
          name="게시판"
          component={BoardListStack}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome5 name="list-ul" size={30} color="#5299EB" />,
          }}
        />
        {/* <Tab.Screen name="쪽지" component={Mail} options={{ headerShown: false, tabBarIcon: () => <Entypo name="chat" size={30} color="black" /> }} /> */}
        <Tab.Screen
          name="Mail"
          component={Mail}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="mail" size={24} color="#5299EB" />,
          }}
        />
        <Tab.Screen
          name="내 정보"
          component={Mypage}
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons name="person-outline" size={30} color="#5299EB" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
