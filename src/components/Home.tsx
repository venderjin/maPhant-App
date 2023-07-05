import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
