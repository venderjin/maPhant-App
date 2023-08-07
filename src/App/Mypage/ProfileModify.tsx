import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { Container, Input, TextButton } from "../../components/common";

const ProfileModify: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Container isFullScreen={true} paddingHorizontal={0} style={{ backgroundColor: "white" }}>
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
          <Text style={{ fontSize: 18, padding: 10 }}>이메일</Text>
          <Text style={{ fontSize: 18, padding: 10 }}>비밀번호</Text>
          <Input
            style={{ paddingVertical: "5%", backgroundColor: "#D8E1EC" }}
            paddingHorizontal={20}
            borderRadius={30}
            placeholder="password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          ></Input>
          <Text style={{ fontSize: 18, padding: 10 }}>비밀번호 확인</Text>
          <Input
            style={{ paddingVertical: "5%", backgroundColor: "#D8E1EC" }}
            paddingHorizontal={20}
            borderRadius={30}
            placeholder="confirmPassword"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
          ></Input>
          <Text style={{ fontSize: 18, padding: 10 }}>닉네임</Text>
          <Input
            style={{ paddingVertical: "5%", backgroundColor: "#D8E1EC" }}
            paddingHorizontal={20}
            borderRadius={30}
            placeholder="nickname"
            onChangeText={text => setNickname(text)}
            value={nickname}
            secureTextEntry={true}
          ></Input>
          <Text style={{ fontSize: 18, padding: 10 }}>이름</Text>
          <Text style={{ fontSize: 18, padding: 10 }}>학번</Text>
          <Text style={{ fontSize: 18, padding: 10 }}>핸드폰 번호</Text>
          <Input
            style={{ paddingVertical: "5%", backgroundColor: "#D8E1EC" }}
            paddingHorizontal={20}
            borderRadius={30}
            placeholder=" PhoneNumber"
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            secureTextEntry={true}
          ></Input>
          <Text style={{ fontSize: 18, padding: 10 }}>계열</Text>
          <Text style={{ fontSize: 18, padding: 10 }}>학과</Text>
          <TextButton onPress={() => {}}>저장 </TextButton>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProfileModify;
