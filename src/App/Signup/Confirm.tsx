import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef,useState } from "react";
import { Alert,StyleSheet, Text, TextInput , View,TouchableOpacity } from "react-native";

import { confirmEmail } from "../../Api/member/signUp";
import { Container, Input, TextButton } from "../../components/common";
const Confirm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const verificationCodeInputRef = useRef<TextInput>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const route = useRoute();
  // const navigation = useNavigation()
  const navigation = useNavigation<NavigationProp<{ SearchUniversity: ISignupForm }>>();

  useEffect(() => {
    console.log(route.params);
    setEmail(route.params.email);
  }, []);

  const checkCode = async (values: ISignupForm) => {
    values.email = email;
    console.log("다음버튼 클릭");
    if (showNextButton) {
      navigation.navigate("SearchUniversity", values);
    }
  };
  const verifyCode = () => {
    if (!verificationCode) {
      Alert.alert("Error", "인증 번호를 입력해주세요.");
      return;
    }
    console.log(email, verificationCode);
    // API를 호출하여 인증 번호 검증 로직 구현
    confirmEmail(email, verificationCode)
      .then(res => {
        console.log(res);
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
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>이메일</Text>
        <TextInput
          value={email}
          placeholder="이메일을 입력해주세요."
          keyboardType="email-address"
          style={styles.input}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>인증 번호</Text>
        <Input
          inputRef={verificationCodeInputRef}
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="인증번호 6자리를 입력해주세요. ㅅㅂ 입력이 되야 뭘 하지"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={verifyCode}
          style={[
            styles.button,
            {
              borderColor: verificationCode === "" ? "#999" : "#0055FF",
              backgroundColor: verificationCode === "" ? "#999" : "#F0F0F0",
              width: 80, // 버튼 길이 조정
            },
          ]}
        >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
      {showNextButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={
            // 다음 버튼 클릭 시 수행할 동작 추가하면 될 듯
            checkCode
          }
          style={[styles.button, { backgroundColor: "#5299EB", marginTop: 20 }]}
        >
          <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>다음</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    width: 300,
    height: 30,
    padding: 8,
    borderColor: "#999",
    marginLeft: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#0055FF",
  },
  timerContainer: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  timerText: {
    fontSize: 12,
    color: "#0055FF",
  },
});

export default Confirm;
