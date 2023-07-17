import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mail from "./src/components/Mail/Mail";
import Mypage from "./src/components/Member/Mypage";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "./src/components/navigator/Routes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Routes[0].component}
      options={{ headerShown: false }}
    />
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
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );s
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default App;
