import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";

const Confirm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [certificationEmail, setCertificationEmail] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const verificationCodeInputRef = useRef<TextInput>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const startTimer = () => {
    setMinutes(10);
    setSeconds(0);
  };

  const emailVerification = () => {
    if (!email) {
      Alert.alert("Error", "이메일을 입력해주세요.");
      return;
    }

    // API를 호출하여 이메일 인증 로직 구현

    // 이메일 인증 성공
    setCertificationEmail(true);
    startTimer();
    verificationCodeInputRef.current?.focus();
  };

  const verifyCode = () => {
    if (!verificationCode) {
      Alert.alert("Error", "인증 번호를 입력해주세요.");
      return;
    }

    // API를 호출하여 인증 번호 검증 로직 구현

    if (verificationCode === "123456") {
      Alert.alert("Success", "인증이 완료되었습니다.");
      // 인증 완료 처리
      setShowNextButton(true);
    } else {
      Alert.alert("Error", "인증번호가 일치하지 않습니다.");
    }
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
      <View style={styles.inputContainer}>
        <Text>이메일</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력해주세요."
          keyboardType="email-address"
          style={styles.input}
          editable={!certificationEmail}
        />
      </View>
      {certificationEmail && (
        <View style={styles.inputContainer}>
          <Text>인증 번호</Text>
          <TextInput
            ref={verificationCodeInputRef}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="인증 번호 6자리를 입력해 주세요."
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={emailVerification}
          disabled={certificationEmail || email === ""}
          style={[
            styles.button,
            {
              borderColor: certificationEmail ? "#999" : email === "" ? "#999" : "#0055FF",
              backgroundColor: certificationEmail ? "#999" : email === "" ? "#999" : "#F0F0F0",
              width: certificationEmail ? 80 : 80, // 버튼 길이 조정
            },
          ]}
        >
          {certificationEmail ? (
            <Text style={styles.buttonText}>인증</Text>
          ) : (
            <Text style={styles.buttonText}>인증 요청</Text>
          )}
        </TouchableOpacity>
        {certificationEmail && (
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
        )}
      </View>
      {certificationEmail && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          </Text>
        </View>
      )}
      {showNextButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            // 다음 버튼 클릭 시 수행할 동작 추가하면 될 듯
          }}
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
