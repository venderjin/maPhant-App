import React, { useState } from "react";
// import { SearchBar } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/Member/CustomInput";
import Search from "../../components/Member/Search";
import {
  validateEmail,
  validateNickname,
  validatePasswordCheck,
  validatePassword,
  validatePhnum,
} from "../../Api/member/signUp";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface ISignupForm {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  sno: string;
  univName: string;
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
    .required("필수 정보입니다.")
    .min(6, ({ min }) => `비밀번호는 최소 ${min}자 이상이어야 합니다.`)
    .test(async (value, testContext) => {
      let result = await validatePassword(value);
      if (result.success) return true;
      return testContext.createError({ message: result.errors });
    }),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("필수 정보입니다."),
  // .test(async (value, testContext) => {
  //   let result = await validatePasswordCheck(value);
  //   if (result.success) return true;
  //   return testContext.createError({ message: result.errors });
  // }),
  phoneNumber: Yup.string().matches(/^\d{3}-\d{4}-\d{4}$/, "000-0000-0000 형식으로 입력해주세요."),
  // .test(async (value, testContext) => {
  //   let result = await validatePhnum(value);
  //   if (result.success) return true;
  //   return testContext.createError({message: result.errors})
  // }),
  nickname: Yup.string()
    .required("필수 정보입니다.")
    .test(async (value, testContext) => {
      let result = await validateNickname(value);
      if (result.success) return true;
      return testContext.createError({ message: result.errors });
    }),
  name: Yup.string().required("필수 정보입니다."),
  sno: Yup.string().required("필수 정보입니다."),
  univName: Yup.string().required("필수 정보입니다."),
});

const Signup: React.FC = () => {
  const SignupForm: ISignupForm = {
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    phoneNumber: "",
    name: "",
    sno: "",
    univName: "",
  };
  const navigation = useNavigation<NavigationProp<{ Confirm: ISignupForm }>>();

  return (
    <Formik
      initialValues={SignupForm}
      onSubmit={value => {
        navigation.navigate("Confirm", value);
        console.info(value);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, values }) => (
        <KeyboardAvoidingView style={styles.container} enabled>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Field placeholder="이메일" name="email" component={CustomInput} />
            <Field placeholder="비밀번호" name="password" component={CustomInput} secureTextEntry />
            <Field
              placeholder="비밀번호 확인"
              name="passwordCheck"
              component={CustomInput}
              secureTextEntry
            />
            <Field placeholder="닉네임" name="nickname" component={CustomInput} />
            <Field placeholder="이름" name="name" component={CustomInput} />
            {/* <Field placeholder="전화번호" name="phoneNumber" component={CustomInput} /> */}
            <Field placeholder="Search Univ..." name="univName" component={Search} />
            <Field placeholder="학번" name="sno" component={CustomInput} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={!isValid || values.email === ""}
            >
              <Text style={styles.signup}> Signup</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
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
  },
});

export default Signup;
