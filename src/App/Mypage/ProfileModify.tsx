import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

import EditUser from "../../Api/member/EditUser";
import { Container, Input, TextButton } from "../../components/common";
import UserStorage from "../../storage/UserStorage";
const ProfileModify: React.FC = () => {
  const profile = useSelector(UserStorage.userProfileSelector);
  const olddata = EditUser.getOldData(profile!.email);

  type UserType = {
    email?: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    name?: string;
    phoneNumber: string;
    studentNumber?: number;
  };

  const usetModifying: UserType = {
    email: profile?.email,
    password: "",
    confirmPassword: "",
    nickname: "",
    name: profile?.name,
    phoneNumber: "",
    studentNumber: olddata["sno"],
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Container style={{ backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <View>
            <Text style={{ fontSize: 18, padding: 10 }}>이메일</Text>
            <View
              style={{
                borderColor: "#D8E1EC",
                borderWidth: 3,
                borderRadius: 30,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={{ fontSize: 18, padding: 10, fontWeight: "bold" }}>
                {usetModifying.email}
              </Text>
            </View>
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
              secureTextEntry={false}
            ></Input>
            <Text style={{ fontSize: 18, padding: 10 }}>이름</Text>
            <View
              style={{
                borderColor: "#D8E1EC",
                borderWidth: 3,
                borderRadius: 30,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={{ fontSize: 18, padding: 10, fontWeight: "bold" }}>
                {usetModifying.name}
              </Text>
            </View>
            <Text style={{ fontSize: 18, padding: 10 }}>학번</Text>
            <View
              style={{
                borderColor: "#D8E1EC",
                borderWidth: 3,
                borderRadius: 30,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={{ fontSize: 18, padding: 10, fontWeight: "bold" }}>
                {usetModifying.studentNumber}
              </Text>
            </View>
            <Text style={{ fontSize: 18, padding: 10 }}>핸드폰 번호</Text>
            <Input
              style={{ paddingVertical: "5%", backgroundColor: "#D8E1EC" }}
              paddingHorizontal={20}
              borderRadius={30}
              placeholder=" PhoneNumber ( 000 - 0000 - 0000 )"
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              secureTextEntry={false}
            ></Input>
            <Text style={{ fontSize: 18, padding: 10 }}>계열</Text>
            <Text style={{ fontSize: 18, padding: 10 }}>학과</Text>
            <TextButton
              onPress={() => {
                EditUser.changePassword(profile?.email, password, confirmPassword);
                EditUser.changeNickname(profile?.email, nickname);
                EditUser.changePhNum(profile?.email, phoneNumber);
              }}
            >
              저장{" "}
            </TextButton>
          </View>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default ProfileModify;
