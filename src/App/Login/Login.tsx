import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { Container, ImageBox, Input, TextButton, Spacer } from "../../components/common";
// import UserAPI from "../../Api/memberAPI";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const handleLogin = () => {
    if (email.length < 5 || password.length < 4) {
      Toast.show("이메일과 비밀번호를 확인해주세요", { duration: Toast.durations.SHORT });
      return;
    }
  };

  return (
    <Container isFullScreen={true}>
      <Spacer size={100} />
      <ImageBox
        source={require("../../../assets/favicon.png")}
        isCenter={true}
        width={100}
      ></ImageBox>
      <Spacer size={100} />
      <Container style={{ width: "100%" }} isItemCenter={true} paddingHorizontal={0}>
        <Input
          style={{ paddingVertical: "5%" }}
          paddingHorizontal={20}
          borderRadius={30}
          placeholder="E-MAIL"
          onChangeText={text => setEmail(text)}
          value={email}
        ></Input>
        <Spacer size={15} />
        <Input
          style={{ paddingVertical: "5%" }}
          paddingHorizontal={20}
          borderRadius={30}
          placeholder="PW"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        ></Input>
        <Spacer size={50} />
        <TextButton onPress={handleLogin}>로그인</TextButton>
      </Container>
      <Spacer size={30} />
      <TextButton
        backgroundColor="transparent"
        paddingVertical={16}
        onPress={() => {
          navigation.navigate("Signup" as never);
        }}
      >
        Don't have any account? Sign up
      </TextButton>
      <Spacer size={50} />
    </Container>
  );
};

export default Login;
