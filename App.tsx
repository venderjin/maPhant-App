import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./src/components/navigator/Routes";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Routes[0].component} />
        <Stack.Screen name="Login" component={Routes[1].component} />
        <Stack.Screen name="QA" component={Routes[2].component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
