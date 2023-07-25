import React, { useState, useEffect } from "react";
// import { SearchBar } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/Member/CustomInput";
import Search from "../../components/Member/Search";
import { signup, universityList, validateEmail, validateNickname } from "../../Api/member/signUp";
interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  studentNumber: string;
  university: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
      "학교 이메일 형식으로 입력해주세요(.ac.kr 또는 .edu)",
    )
    .required("이메일은 필수 항목입니다.")
    .test(async (value, testContext) => {
      let result = await validateEmail(value);
      if (result.success) return true;
      return testContext.createError({ message: result.errors });
    }),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, "비밀번호에는 소문자가 포함되어야 합니다.")
    .matches(/\w*[A-Z]\w*/, "비밀번호에는 대문자가 포함되어야 합니다.")
    .matches(/\d/, "비밀번호에는 숫자가 포함되어야 합니다.")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "비밀번호에는 특수문자가 포함되어야 합니다.")
    .required("필수 정보입니다.")
    .min(8, ({ min }) => `비밀번호는 최소 ${min}자 이상이어야 합니다.`),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("필수 정보입니다."),
  phoneNumber: Yup.string().matches(/^\d{3}-\d{4}-\d{4}$/, "000-0000-0000 형식으로 입력해주세요."),
  nickname: Yup.string()
    // .matches(/^[a-zA-Z0-9가-힣_-]{3,20}$/, "닉네임은 3자 이상 20자 이하이어야 합니다.")
    .required("필수 정보입니다.")
    .test(async (value, testContext) => {
      let result = await validateNickname(value);
      if (result.success) return true;
      return testContext.createError({ message: result.errors });
    }),
  studentNumber: Yup.string().required("필수 정보입니다."),
  university: Yup.string().required("필수 정보입니다."),
});

const Signup: React.FC = () => {
  const SignupForm: ISignupForm = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    name: "",
    phoneNumber: "",
    studentNumber: "",
    university: "",
  };
  return (
    <Formik
      initialValues={SignupForm}
      validationSchema={validationSchema}
      onSubmit={async values => {
        await signup(
          values.email,
          values.password,
          values.confirmPassword,
          values.nickname,
          values.name,
          values.phoneNumber,
          values.studentNumber,
          values.university,
        )
          .then(response => {
            // setLoading(true);
            if (response.success) {
              //라우터 넣으면 됨
            }
          })
          .catch(error => {
            // setLoading(false);
            alert(`회원가입 실패 ${error} \n다시 시도해주세요.`);
          });
      }}
    >
      {({ handleSubmit, isValid, values }) => (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <KeyboardAvoidingView style={styles.container} enabled>
            <Field placeholder="이메일" name="email" component={CustomInput} />
            <Field placeholder="비밀번호" name="password" component={CustomInput} secureTextEntry />
            <Field
              placeholder="비밀번호 확인"
              name="confirmPassword"
              component={CustomInput}
              secureTextEntry
            />
            <Field placeholder="닉네임" name="nickname" component={CustomInput} />
            <Field placeholder="이름" name="name" component={CustomInput} />
            <Field placeholder="전화번호" name="phoneNumber" component={CustomInput} />
            <Field
              placeholder="대학교 검색"
              name="university"
              component={Search}
              list={() => universityList()}
            />
            <Field placeholder="학번" name="studenNumber" component={CustomInput} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={!isValid || values.email === ""}
            >
              <Text style={styles.signup}> Signup</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
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
  scrollView: {
    marginTop: 50,
    paddingBottom: 50,
  },
});

export default Signup;
