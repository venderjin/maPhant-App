import React from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import Home from "./src/component/Home";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
  },
});

export default App;
