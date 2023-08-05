import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Container, Input, Spacer, TextButton } from "../../components/common";

const PasswordCheck: React.FC = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProps>();
  //로그인된  회원의 email을 서버로 받고 user가 입력한 비밀번호를 넘겨서 check
  return (
    <Container isFullScreen={true} paddingHorizontal={0}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Spacer size={80} />
          <Container style={{ width: "100%" }} isItemCenter={true} paddingHorizontal={0}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}> 회원정보 수정 전 비밀번호를 확인해주세요</Text>
            </View>
            <Spacer size={25} />
            <Input
              style={{ paddingVertical: "5%" }}
              paddingHorizontal={20}
              borderRadius={30}
              placeholder="Password"
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
          </Container>
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
export default PasswordCheck;
