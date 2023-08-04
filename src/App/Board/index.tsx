import { createStackNavigator } from "@react-navigation/stack";

import Routes from "../../Navigator/BoardRoute";

const Stack = createStackNavigator();
export default function BoardIndex(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Routes[0].component} />
      <Stack.Screen name="QnABoard" component={Routes[1].component} />
      <Stack.Screen name="DetailList" component={Routes[2].component} />
      <Stack.Screen name="QnAdetail" component={Routes[3].component} />
      <Stack.Screen name="post" component={Routes[4].component} />
    </Stack.Navigator>
  );
}
