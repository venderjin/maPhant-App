import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import { confirmEmail } from "../../Api/member/signUp";
import { Container, Input, TextButton } from "../../components/common";
import { SignUpFormParams } from "../../Navigator/SigninRoutes";

const Confirm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  // const verificationCodeInputRef = useRef<TextInput>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const route = useRoute();
  const params = route.params as SignUpFormParams;

  const navigation = useNavigation<NavigationProp<{ SearchUniversity: SignUpFormParams }>>();

  useEffect(() => {
    if (params && params.email) setEmail(params.email);
  }, [route]);

  const checkCode = () => {
    if (showNextButton) {
      navigation.navigate("SearchUniversity", params);
    }
  };
  const verifyCode = () => {
    if (!verificationCode) {
      Alert.alert("Error", "인증 번호를 입력해주세요.");
      return;
    }

    // API를 호출하여 인증 번호 검증 로직 구현
    confirmEmail(email, verificationCode)
      .then(res => {
        if (res.success) {
          Alert.alert("Success", "인증이 완료되었습니다.");
          // 인증 완료 처리
          setShowNextButton(true);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const countDown = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(countDown);
      } else {
        if (seconds === 0) {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, [minutes, seconds]);

  return (
    <Container style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 40, paddingTop: 80 }}>
      <Container style={{ alignItems: "flex-end", marginRight: 10 }}>
        <Text style={{ color: "#0055FF", fontSize: 12 }}>
          {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </Text>
      </Container>
      <Container style={{ marginBottom: 20 }}>
        <Text>이메일</Text>
        <Input
          value={email}
          placeholder="이메일을 입력해주세요."
          keyboardType="email-address"
          editable={false}
          style={styles.input}
        />
      </Container>

      <Container style={{ marginBottom: 20 }}>
        <Text>인증 번호</Text>
        <Input
          // ref={verificationCodeInputRef}
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="인증번호 6자리를 입력해주세요."
          keyboardType="numeric"
          style={styles.input}
        />
      </Container>
      <Container
        style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}
      >
        <TextButton
          activeOpacity={0.7}
          onPress={verifyCode}
          fontSize={12}
          fontColor={"#0055FF"}
          style={[
            styles.button,
            {
              backgroundColor: verificationCode === "" ? "#999" : "$0055FF",
              borderColor: verificationCode === "" ? "#999" : "#0055FF",
              width: 80,
            },
          ]}
        >
          확인
        </TextButton>
      </Container>

      {showNextButton && (
        <TextButton
          activeOpacity={0.7}
          onPress={checkCode}
          fontSize={12}
          fontColor={"#FFFFFF"}
          style={[
            styles.button,
            {
              backgroundColor: "5299EB",
              marginTop: 20,
            },
          ]}
        >
          다음
        </TextButton>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    width: 300,
    height: 40,
    padding: 8,
    borderColor: "#999",
    marginLeft: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Confirm;
