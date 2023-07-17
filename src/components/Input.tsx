import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyleSheet } from "react-native";

const SignupFormInput = ({
  placeholder,
  value,
  setter,
}: {
  placeholder: string;
  value: string;
  setter: (value: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <Formik
      initialValues={{
        [value]: "",
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        setter(values[value]);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <View>
          <Text
            style={[
              styles.label,
              {
                top: isFocused || values[value] ? 5 : 20,
                fontSize: isFocused || values[value] ? 12 : 16,
                color: isFocused ? "#000" : "#aaa",
              },
            ]}
          >
            {placeholder}
          </Text>
          <TextInput
            style={{ ...styles.input, marginTop: isFocused ? 25 : 20 }}
            placeholder={placeholder}
            value={values[value]}
            onChangeText={handleChange(value)}
            onBlur={() => {
              handleBlur(value);
              onBlur();
            }}
            onFocus={handleFocus}
            keyboardType={
              placeholder === "phone number" || placeholder === "student number"
                ? "numeric"
                : "default"
            }
            secureTextEntry={placeholder === "pw" || placeholder === "pw confirm"}
          />
          {touched[value] && errors[value] && (
            <Text style={{ color: "tomato" }}>{errors[value]}</Text>
          )}
        </View>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일은 필수 항목입니다."),
  password: Yup.string().required("필수 정보입니다.").min(6, "6자리 이상 입력해주세요."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("필수 정보입니다."),
  nickname: Yup.string().required("필수 정보입니다."),
  studentNumber: Yup.string().required("필수 정보입니다."),
});

const styles = StyleSheet.create({
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
});

export default SignupFormInput;
