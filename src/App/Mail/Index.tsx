import { createStackNavigator } from "@react-navigation/stack";

import MailRoutes from "../../Navigator/MailRoute";

const Stack = createStackNavigator();

// eslint-disable-next-line react/display-name
export default () => (
  <Stack.Navigator initialRouteName="Mail">
    <Stack.Screen
      name="Mail"
      component={MailRoutes[0].component}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chatroom"
      component={MailRoutes[1].component}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SearchUser"
      component={MailRoutes[2].component}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
