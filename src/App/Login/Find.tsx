import { Field, Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../../components/Member/CustomInput";
import * as Yup from "yup";
import { newPassword } from "../../Api/member/signUp";
import ConfirmEmail from "../../components/Member/ConfirmEmail";
import { useState } from "react";

const validationSchema = Yup.object().shape({
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
});

const Find: React.FC  = () => {
  const [email, setEmail] = useState("");
  const [authcode, setAuthcode] = useState("");

  console.log([email, authcode]);
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={async values => {
        await newPassword(email, values.password, values.confirmPassword)
          .then(result => {
            if (result.success) {
              alert("비밀번호가 변경되었습니다.");
              //라우터 넣으면 됨
            }
            console.log(result);
          })
          .catch(error => {});
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.pwFont}>비밀번호 찾기</Text>
            <ConfirmEmail
              onEmailChange={setEmail}
              onAuthcodeChange={setAuthcode}
              email={email}
              authcode={authcode}
            />
            <View>
              <Field
                placeholder="비밀번호"
                name="password"
                component={CustomInput}
                secureTextEntry
              />
              <Field
                placeholder="비밀번호 확인"
                name="confirmPassword"
                component={CustomInput}
                secureTextEntry
              />
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.find}> 확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingVertical: 80,
  },
  box: {
    flex: 1,
  },
  pwFont: {
    fontSize: 20,
    fontWeight: "bold",
  },
  find: {
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

export default Find;
