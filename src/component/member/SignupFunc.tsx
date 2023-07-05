import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  // value : textinput 현재 값 - setter를 통해 변경
  // setter : textinput 값 변경 시 호출되는 콜백 함수 ; 새로운 값으로 업데이트를 위함
  // placeholder : 임시 텍스트
  const handleInputChange = (value: string, setter: any) => {
    setter(value);
  };

  const renderTextInputWithLabel = (
    placeholder: any,
    value: string,
    setter: any
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <View>
        <Text
          style={[
            styles.label,
            {
              top: isFocused || value ? 5 : 20,
              fontSize: isFocused || value ? 12 : 16,
              color: isFocused ? "#000" : "#aaa",
            },
          ]}
        >
          {placeholder}
        </Text>
        <TextInput
          style={{ ...styles.input, marginTop: isFocused ? 25 : 20 }}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => handleInputChange(text, setter)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTextInputWithLabel("email", email, setEmail)}
      {renderTextInputWithLabel("pw", password, setPassword)}
      {renderTextInputWithLabel(
        "pw confirm",
        passwordConfirm,
        setPasswordConfirm
      )}
      {renderTextInputWithLabel("nickname", nickname, setNickname)}
      {renderTextInputWithLabel("phone number", phoneNumber, setPhoneNumber)}
      {renderTextInputWithLabel(
        "student number",
        studentNumber,
        setStudentNumber
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.signup}> Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  input: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  label: {
    position: "absolute",
    left: 10,
    fontSize: 16,
    color: "#aaa",
    backgroundColor: "transparent",
  },
  signup: {
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 40,
  },
});
