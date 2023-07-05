import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BoardList from "./src/components/Board/BoardList";
import TotalBoard from "./src/components/Board/TotalBoard";
import QnABoard from "./src/components/Board/QnABoard";
import DetailBoardList from "./src/components/Board/DetailBoardList";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Board" component={BoardList} />
        <Stack.Screen name="TotalBoard" component={TotalBoard} />
        <Stack.Screen name="QnABoard" component={QnABoard} />
        <Stack.Screen name="DetailBoardList" component={DetailBoardList} />
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
