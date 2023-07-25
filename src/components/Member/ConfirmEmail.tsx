import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { authenticationCode, sendEmail } from "../../Api/member/signUp";

const ConfirmEmail = ({
  onEmailChange,
  onAuthcodeChange,
  email,
  authcode,
}: {
  onEmailChange: (email: string) => void;
  onAuthcodeChange: (authcode: string) => void;
  email: string;
  authcode: string;
}) => {
  const [certificationEmail, setCertificationEmail] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [emailMessage, setEmailMessage] = useState("");
  const verificationCodeInputRef = useRef<TextInput>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const startTimer = () => {
    setMinutes(10);
    setSeconds(0);
  };

  const emailVerification = async () => {
    // API를 호출하여 이메일 인증 로직 구현
    await sendEmail(email).then(result => {
      if (result.success) {
        // 이메일 인증 성공
        setCertificationEmail(true);
      }
      console.log(result);
      console.log(email);
    });

    startTimer();
    verificationCodeInputRef.current?.focus();
  };

  const verifyCode = async () => {
    // API를 호출하여 인증 번호 검증 로직 구현
    await authenticationCode(email, authcode).then(result => {
      if (result.success) {
        Alert.alert("Success", "인증이 완료되었습니다.");
        // 인증 완료 처리
        setShowNextButton(true);
      }
      console.log(result);
      console.log(authcode);
    });
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
    <View>
      <View>
        <TextInput
          value={email}
          onChangeText={value => {
            onEmailChange(value);
          }}
          placeholder="이메일을 입력해주세요."
          keyboardType="email-address"
          style={styles.input}
          editable={!certificationEmail}
        />
      </View>
      {certificationEmail && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              ref={verificationCodeInputRef}
              value={authcode}
              onChangeText={value => {
                onAuthcodeChange(value);
                console.log(authcode);
              }}
              placeholder="인증 번호 6자리를 입력해 주세요."
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {`${minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}
            </Text>
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        {!certificationEmail ? (
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
            <Text style={styles.buttonText}>인증 요청</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={verifyCode}
            style={[
              styles.button,
              {
                borderColor: authcode === "" ? "#999" : "#0055FF",
                backgroundColor: authcode === "" ? "#999" : "#F0F0F0",
                width: 80, // 버튼 길이 조정
              },
            ]}
          >
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        )}
      </View>
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
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
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
  label: {
    position: "absolute",
    left: 10,
    fontSize: 16,
    color: "#aaa",
    backgroundColor: "transparent",
  },
});

export default ConfirmEmail;
