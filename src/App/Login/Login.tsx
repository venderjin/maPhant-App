import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={require("../../../assets/favicon.png")} />
      </View>
      <View style={styles.LoginBox}>
        <View>
          <TextInput style={styles.input} placeholder="E-MAIL" />
        </View>
        <View>
          <TextInput style={styles.input} placeholder="PW" />
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
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
    // paddingHorizontal: 10%,
    paddingLeft: "10%",
    paddingRight: "10%",
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
    paddingVertical: "5%",
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: "8%",
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
    // paddingVertical: 15,
    paddingVertical: "5%",
    // paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: "7%",
  },
  button1Box: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
  },

  button1: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    marginTop: "3%",
    // marginBottom: 10,
  },
});

export default Login;
