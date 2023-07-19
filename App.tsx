import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mail from "./src/App/Mail/Mail";
// import Mypage from "./src/components/member/Mypage";
import Mypage from "./src/App/Mypage/Mypage";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/App/Home/Index";
import BoardListStack from "./src/App/Board/Index";
import SignupRoutes from "./src/Navigator/SignupRoutes";
import Signup from "./src/App/Member/Signup";
import Login from "./src/App/Login/Index";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Routes[0].component} options={{ headerShown: false }} />
    <Stack.Screen name="alarm" component={Routes[2].component} />
  </Stack.Navigator>
);
const BoardListStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Board" component={Routes[3].component} />
    <Stack.Screen name="QnABoard" component={Routes[4].component} />
    <Stack.Screen name="DetailList" component={Routes[5].component} />
    <Stack.Screen name="QnAdetail" component={Routes[6].component} />
  </Stack.Navigator>
);

const App = () => {
  let isLogged = false;
  if (isLogged == false) {
    return (
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
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

export default App;
