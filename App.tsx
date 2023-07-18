import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mail from "./src/components/Mail/Mail";
// import Mypage from "./src/components/member/Mypage";
import Mypage from "./src/components/Member/Mypage";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "./src/components/navigator/Routes";
import { SafeAreaView, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import Home from "./src/App/Home/Home";

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
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="홈"
          component={HomeStack}
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
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Signin">
    //     <Stack.Screen name="Signin" component={SignupRoutes[0].component} />
    //     <Stack.Screen name="Find" component={SignupRoutes[1].component} />
    //     <Stack.Screen name="Signup" component={SignupRoutes[2].component} />
    //     <Stack.Screen name="TermsSet" component={SignupRoutes[3].component} />
    //     <Stack.Screen name="SearchUniversity" component={SignupRoutes[4].component} />
    //     <Stack.Screen name="Confirm" component={SignupRoutes[5].component} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
