import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";

const Find: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.pwFont}>비밀번호 찾기</Text>
        <View>
          <TextInput style={styles.input} placeholder="E-MAIL" />
          <TextInput style={styles.input} placeholder="E-MAIL" />
          <TextInput style={styles.input} placeholder="E-MAIL" />
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.find}> 확인</Text>
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
