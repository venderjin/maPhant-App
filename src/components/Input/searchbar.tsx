import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const searchbar = () => {
  return (
    <View style={styles.search}>
      <TextInput placeholder="게시판 검색..." style={styles.searchbar}></TextInput>
      <AntDesign name="search1" size={24} color="black" />
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "skyblue",
    margin: 20,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchbar: {
    flex: 1,
    height: "100%",
  },
});

export default searchbar;
