import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ProfileModify = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>회원정보 수정페이지</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    marginTop: 18,
  },
});
export default ProfileModify;
