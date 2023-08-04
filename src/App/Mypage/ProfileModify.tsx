import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Container, TextButton } from "../../components/common";

const ProfileModify: React.FC = () => {
  return (
    <Container isForceKeyboardAvoiding={true} style={{ backgroundColor: "white" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ backgroundColor: "white" }}
      ></ScrollView>
      <TextButton
        backgroundColor="#5299EB"
        fontColor="white"
        paddingHorizontal={20}
        paddingVertical={15}
        borderRadius={30}
        fontSize={18}
        onPress={() => {}}
      >
        저장하기
      </TextButton>
      <TextButton onPress={() => {}}>확인하기</TextButton>
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
