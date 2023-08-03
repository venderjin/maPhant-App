import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Container, Input, Spacer, TextButton } from "../../components/common";

const ProfileModify: React.FC = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProps>();

  return (
    <Container isFullScreen={true} paddingHorizontal={0}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={{ fontSize: 15 }}>회원정보 수정 전 비밀번호를 확인해주세요</Text>
          <Spacer size={35} />
          <Input
            style={{ paddingVertical: "5%" }}
            paddingHorizontal={20}
            borderRadius={30}
            placeholder="PW"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          ></Input>
          <Spacer size={30} />
          <TextButton
            onPress={() => {
              navigation.navigate("ProfileModify");
            }}
          >
            확인하기
          </TextButton>
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
