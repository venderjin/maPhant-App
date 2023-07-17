import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

const Confirm = () => {
  const [email, setEmail] = useState("");
  const [certificationEmail, setCertificationEmail] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  // 이메일 중복체크
  const emailVerification = async (email: string) => {
    // Simulating API call with a delay
    setTimeout(() => {
      const status = 201; // Example status code
      const data = { status: true }; // Example response data

      if (status === 201) {
        if (data.status === true) {
          setCertificationEmail(true);
          setMinutes(10);
          setSeconds(0);
        }
      } else {
        Alert.alert("Error", "올바른 이메일 형식이 아닙니다.");
      }
    }, 1000);
  };

  function alert() {
    Alert.alert("인증번호를 발송하시겠습니까?\n유효시간(10분)이내에 입력해주세요.", "", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => {
          emailVerification(email);
        },
      },
    ]);
  }
  useEffect(() => {
    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countDown);
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [seconds, minutes]);

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
          autoFocus={true}
          editable={!certificationEmail}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={certificationEmail || email === ""}
          onPress={alert}
          style={[
            styles.button,
            {
              borderColor: certificationEmail ? "#999" : email === "" ? "#999" : "#0055FF",
              backgroundColor: certificationEmail ? "#999" : email === "" ? "#999" : "#F0F0F0",
            },
          ]}
        >
          {certificationEmail ? <Text style={styles.buttonText}>인증</Text> : <Text style={styles.buttonText}>인증 요청</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text>인증 번호</Text>
        <TextInput
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="인증 번호 6자리를 입력해 주세요."
          keyboardType="numeric"
          style={styles.input}
          autoFocus={true}
          editable={!certificationEmail}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={certificationEmail || email === ""}
          onPress={() => {
            Alert.alert("인증번호 확인", "입력한 인증번호를 확인하시겠습니까?", [
              {
                text: "취소",
                style: "cancel",
              },
              {
                text: "확인",
                onPress: () => {
                  if (verificationCode === "123456") {
                    // Verification successful
                    Alert.alert("Success", "인증이 완료되었습니다.");
                    setCertificationEmail(true);
                  } else {
                    // Verification failed
                    Alert.alert("Error", "인증번호가 일치하지 않습니다.");
                  }
                },
              },
            ]);
          }}
          style={{
            ...styles.button,
            borderColor: certificationEmail ? "#999" : verificationCode === "" ? "#999" : "#0055FF",
            backgroundColor: certificationEmail ? "#999" : verificationCode === "" ? "#999" : "#F0F0F0",
          }}
        >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
      {/* 예외 처리 */}
      {emailMessage === '' && verificationCode && !certificationEmail && (
        <View style={{ position: "absolute", right: 72, paddingTop: 55, flexDirection: 'row' }}>
          <Text style={styles.timerText}>
            {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          </Text>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    width: 200,
    height: 30,
    padding: 5,
    marginRight: 10,
    borderColor: "#999",
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    width: 64,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#0055FF",
  },
  timerText: {
    fontSize: 12,
    color: "#0055FF",
  },
});

export default Confirm;
