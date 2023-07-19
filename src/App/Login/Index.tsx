import { createStackNavigator } from "@react-navigation/stack";
import SigninRoutes from "../../Navigator/SigninRoutes";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Signin">
    <Stack.Screen name="Signin" component={SigninRoutes[0].component} />
    <Stack.Screen name="Find" component={SigninRoutes[1].component} />
  </Stack.Navigator>
);
