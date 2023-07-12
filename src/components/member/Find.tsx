import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const Find = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.idFont}>비밀번호 찾기</Text>
        <View>
          <TextInput style={styles.input} placeholder="E-MAIL" />
          <TextInput style={styles.input} placeholder="E-MAIL" />
          <TextInput style={styles.input} placeholder="E-MAIL" />
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.login}> Login</Text>
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
    paddingVertical: 80,
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
  box: {
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
  idFont: {
    fontSize: 20,
    fontWeight: "bold",
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

export default Find;
