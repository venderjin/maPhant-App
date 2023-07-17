import React, { useState } from "react";
// import { SearchBar } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "./CustomInput";

type Item = {
  id: number;
  name: string;
};

interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  studentNumber: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("유효한 이메일 주소를 입력해주세요.")
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
});

const Searchh = ({ setSearchUniv }: { setSearchUniv: any }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Item[]>([]);

  const data: Item[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Pineapple" },
    { id: 5, name: "Mango" },
    { id: 6, name: "Strawberry" },
    { id: 7, name: "Lemon" },
  ];

  const updateSearch = (text: string) => {
    setSearch(text);

    // 검색어를 이용하여 데이터를 필터링
    const filteredItems = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));

    setFilteredData(filteredItems);
    setSearchUniv(text);
  };

  return (
    <View>
      {filteredData.map(item =>
        search === "" ? null : (
          <View style={styles.itemContainer} key={item.id.toString()}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        ),
      )}
    </View>
  );
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [searchUniv, setSearchUniv] = useState("");

  const SignupForm: ISignupForm = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
    studentNumber: "",
  };

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
            <Field placeholder="비밀번호" name="password" component={CustomInput} />
            <Field placeholder="비밀번호 확인" name="confirmPassword" component={CustomInput} />
            <Field placeholder="닉네임" name="nickname" component={CustomInput} />
            <Field placeholder="전화번호" name="phoneNumber" component={CustomInput} />
            <Field placeholder="학번" name="studentNumber" component={CustomInput} />
            <Searchh setSearchUniv={setSearchUniv} />
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
  scrollView: {
    marginTop: 50,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: -5,
    marginTop: 10,
  },
  searchBarInputContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
  },
  itemContainer: {
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  terms: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  termsButton: {
    // backgroundColor: "#000",
    borderBottomWidth: 1,
  },
  termsText: {
    // color: "white",
    textAlign: "center",
  },
});

export default Signup;
