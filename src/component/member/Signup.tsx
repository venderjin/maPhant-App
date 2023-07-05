import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="email" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="pw" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="pw confirm" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="nickname" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="phone number" />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="student number" />
      </View>
      <View>
        <TouchableOpacity style = {styles.button}>
          <Text style={styles.signup}> Signup</Text>
        </TouchableOpacity>
      </View>
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
  }
});
