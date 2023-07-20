import React, { useState } from "react";
// import { SearchBar } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/Member/CustomInput";
import Search from "../../components/Member/Search";

interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  studentNumber: string;
  university: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
      "이메일 형식으로 입력해주세요",
    )
    .required("이메일은 필수 항목입니다."),
  password: Yup.string()
    .required("필수 정보입니다.")
    .min(6, ({ min }) => `비밀번호는 최소 ${min}자 이상이어야 합니다.`),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("필수 정보입니다."),
  phoneNumber: Yup.string().matches(/^\d{3}-\d{4}-\d{4}$/, "000-0000-0000 형식으로 입력해주세요."),
  nickname: Yup.string().required("필수 정보입니다."),
  studentNumber: Yup.string().required("필수 정보입니다."),
  university: Yup.string().required("필수 정보입니다."),
});

const Signup: React.FC = () => {
  const SignupForm: ISignupForm = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
    studentNumber: "",
    university: "",
  };
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={SignupForm}
      onSubmit={values => console.log(values)}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, values }) => (
        <KeyboardAvoidingView style={styles.container} enabled>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Field placeholder="이메일" name="email" component={CustomInput} />
            <Field placeholder="비밀번호" name="password" component={CustomInput} secureTextEntry />
            <Field
              placeholder="비밀번호 확인"
              name="confirmPassword"
              component={CustomInput}
              secureTextEntry
            />
            <Field placeholder="닉네임" name="nickname" component={CustomInput} />
            {/* <Field placeholder="전화번호" name="phoneNumber" component={CustomInput} /> */}
            <Field placeholder="Search Univ..." name="university" component={Search} />
            <Field placeholder="학번" name="studentNumber" component={CustomInput} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // handleSubmit();
                navigation.navigate("SearchUniversity" as never);
              }}
              // disabled={!isValid || values.email === ""}
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
