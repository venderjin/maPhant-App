import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BoardList from "./src/App/Board/index";
import List from "./src/App/Board/List";
import TotalBoard from "./src/App/Board/TotalList";
import QnABoard from "./src/App/Board/QnAList";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Board" component={BoardList} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="TotalBoard" component={TotalBoard} />
        <Stack.Screen name="QnABoard" component={QnABoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
