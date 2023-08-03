import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Container } from "../../components/common";

const ProfileModify: React.FC = () => {
  return (
    <Container isFullScreen={true} paddingHorizontal={0}>
      <ScrollView style={styles.container}>
        <View>
          <Text>회원정보 수정하기</Text>
        </View>
      </ScrollView>
    </Container>
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
