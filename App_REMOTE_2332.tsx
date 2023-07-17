import React from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import Home from "./src/component/Home";

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default App;
