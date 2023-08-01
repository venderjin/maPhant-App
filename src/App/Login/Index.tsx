import { createStackNavigator } from "@react-navigation/stack";
import SigninRoutes from "../../Navigator/SigninRoutes";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="SearchUniversity">
    <Stack.Screen name="Login" component={SigninRoutes[0].component} />
    <Stack.Screen name="Find" component={SigninRoutes[1].component} />
    <Stack.Screen name="TermsSet" component={SigninRoutes[2].component} />
    <Stack.Screen name="Signup" component={SigninRoutes[3].component} />
    <Stack.Screen name="SearchUniversity" component={SigninRoutes[4].component} />
    <Stack.Screen name="Confirm" component={SigninRoutes[5].component} />
  </Stack.Navigator>
);
