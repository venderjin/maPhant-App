import { createStackNavigator } from "@react-navigation/stack";
import SignupRoutes from "../../Navigator/SignupRoutes";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Signp">
    <Stack.Screen name="Signup" component={SignupRoutes[0].component} />
    <Stack.Screen name="TermsSet" component={SignupRoutes[1].component} />
    <Stack.Screen name="SearchUniversity" component={SignupRoutes[2].component} />
    <Stack.Screen name="Confirm" component={SignupRoutes[3].component} />
  </Stack.Navigator>
);
