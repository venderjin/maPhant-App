import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../../Navigator/BoardRoute";

const Stack = createStackNavigator();
export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Board" component={Routes[0].component} />
    <Stack.Screen name="QnABoard" component={Routes[1].component} />
    <Stack.Screen name="DetailList" component={Routes[2].component} />
    <Stack.Screen name="QnAdetail" component={Routes[3].component} />
  </Stack.Navigator>
);
