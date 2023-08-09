import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const Myimg: React.FC = () => {
  return (
    <View style={styles.profileImgContainer}>
      <FontAwesome name="user-circle-o" size={100} color="#CBD7E6" />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImgContainer: {
    paddingVertical: 5,
  },
});
export default Myimg;
