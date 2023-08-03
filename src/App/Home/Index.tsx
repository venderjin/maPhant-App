import { createStackNavigator } from "@react-navigation/stack";

import Routes from "../../Navigator/HomeRoute";

const Stack = createStackNavigator();

//  eslint-disable-next-line react/display-name
export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Routes[0].component} options={{ headerShown: false }} />
    <Stack.Screen name="alarm" component={Routes[1].component} />
  </Stack.Navigator>
);
