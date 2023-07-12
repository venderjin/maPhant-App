import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/components/Home";
import BoardList from "./src/components/Board/BoardList";
import Mail from "./src/components/Mail/Mail";
import Mypage from "./src/components/Member/Mypage";
import { AntDesign, FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="홈" component={Home} options={{ headerShown: false, tabBarIcon: () => <AntDesign name="home" size={30} color="#5299EB" /> }} />
        <Tab.Screen
          name="게시판"
          component={BoardList}
          options={{ headerShown: false, tabBarIcon: () => <FontAwesome5 name="list-ul" size={30} color="#5299EB" /> }}
        />
        {/* <Tab.Screen name="쪽지" component={Mail} options={{ headerShown: false, tabBarIcon: () => <Entypo name="chat" size={30} color="black" /> }} /> */}
        <Tab.Screen name="Mail" component={Mail} options={{ headerShown: false, tabBarIcon: () => <AntDesign name="mail" size={24} color="#5299EB" /> }} />
        <Tab.Screen
          name="내 정보"
          component={Mypage}
          options={{ headerShown: false, tabBarIcon: () => <Ionicons name="person-outline" size={30} color="#5299EB" /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
