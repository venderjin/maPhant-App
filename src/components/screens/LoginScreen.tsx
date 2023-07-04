import React from "react";
import { View, Button } from "react-native";

function LoginScreen({ navigation }: { navigation: any }) {
  return (
    <View>
      <Button title="Login" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}

export default LoginScreen;
