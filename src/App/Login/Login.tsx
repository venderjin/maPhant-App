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

  const loginHandler = () => {
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
      Toast.show("이메일 형식을 확인해주세요", { duration: Toast.durations.SHORT });
      return;
    } else if (password.length < 4) {
      Toast.show("비밀번호는 4자리 이상 입니다", { duration: Toast.durations.SHORT });
      return;
    }

    UserAPI.login(email, password)
      .then(res => {
        if (res.message == "Not found") {
          Toast.show("존재하지 않는 이메일 입니다", { duration: Toast.durations.SHORT });
          return;
        } else if (res.message == "Invalid password") {
          Toast.show("비밀번호가 틀렸습니다", { duration: Toast.durations.SHORT });
          return;
        } else {
          console.log(res);
          UserStorage.setUserToken(res["pubKey"], res["privKey"]);

          return UserAPI.getProfile();
        }
      })
      .then(res => {
        UserStorage.setUserProfile(res.data);
      })
      .catch(err => {
        //Toast.show(err.toString()), { duration: Toast.durations.SHORT };
      });
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
