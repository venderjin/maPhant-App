import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserStorage from "../../storage/UserStorage";
import Toast from "react-native-root-toast";
import { PostAPI, GetAPI } from "../../Api/fetchAPI";
import { UserData } from "../../Api/memberAPI";
import UserAPI from "../../Api/memberAPI";

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
      Toast.show("이메일 형식을 확인해주세요", { duration: Toast.durations.SHORT });
      return;
    } else if (password.length < 4) {
      Toast.show("비밀번호는 4자리 이상 입니다", { duration: Toast.durations.SHORT });
      return;
    }

    UserAPI.login(email, password)
      .then(res => {
        if (res.message == "Not found") {
          Toast.show("존재하지 않는 이메일 입니다", { duration: Toast.durations.SHORT });
          return;
        } else if (res.message == "Invalid password") {
          Toast.show("비밀번호가 틀렸습니다", { duration: Toast.durations.SHORT });
          return;
        } else {
          console.log(res);
          UserStorage.setUserToken(res["pubKey"], res["privKey"]);

          return UserAPI.getProfile();
        }
      })
      .then(res => {
        UserStorage.setUserProfile(res.data);
      })
      .catch(err => {
        //Toast.show(err.toString()), { duration: Toast.durations.SHORT };
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={require("../../../assets/favicon.png")} />
      </View>
      <View style={styles.LoginBox}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="E-MAIL"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="PW"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={loginHandler}>
            <Text style={styles.login}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.TextButtonBox}>
        <View>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => {
              navigation.navigate("TermsSet" as never);
            }}
          >
            <Text style={styles.signup}> Don't have any account? Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button1Box}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => {
              navigation.navigate("Find" as never);
            }}
          >
            <Text style={styles.search}> ID / PW 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  imageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: "30%",
    width: 100,
    height: 100,
  },
  LoginBox: {
    flex: 1,
  },
  input: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  login: {
    color: "white",
    textAlign: "center",
  },
  search: {
    color: "black",
    textAlign: "center",
  },
  signup: {
    color: "black",
    textAlign: "center",
  },
  TextButtonBox: {
    flex: 1,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 40,
  },
  button1Box: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
  },

  button1: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default Login;
