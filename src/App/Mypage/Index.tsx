import { createStackNavigator } from "@react-navigation/stack";

import Routes from "../../Navigator/MypageRoute";

const Stack = createStackNavigator();

export default function MypageIndex() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={Routes[0].component}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PasswordCheck" component={Routes[1].component} />
      <Stack.Screen name="ProfileModify" component={Routes[2].component} />
      <Stack.Screen name="Mypost" component={Routes[3].component} />
      <Stack.Screen name="QnAdetail" component={Routes[4].component} />
      <Stack.Screen name="Bookmark" component={Routes[5].component} />
    </Stack.Navigator>
  );
}
