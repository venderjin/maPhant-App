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
  const theme = useTheme();

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
