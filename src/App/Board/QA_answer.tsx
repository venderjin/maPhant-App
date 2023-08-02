import React, { useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const QA_answer = () => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View>
              <TextInput
                style={styles.title}
                placeholder="title"
                value={title}
              ></TextInput>
            </View>
            <View
              style={{ width: "100%", height: 2, backgroundColor: "#f2f2f2" }}
            />
            {/* <View style={{ height: 100 }}>
              <Text>공백입니다</Text>
            </View> */}
            <View style={styles.contentcontainer}>
              <TextInput
                style={styles.content}
                multiline={true}
                placeholder="content"
                maxLength={500}
                value={context}
              ></TextInput>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.button}>
          <Button title="등록" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  contentcontainer: {
    flex: 2,
  },
  content: {
    flex: 1,
    fontSize: 20,
    margin: 10,
  },
  button: {
    borderRadius: 10,
    marginHorizontal: "30%",
    marginBottom: 30,
    padding: 10,
    backgroundColor: "skyblue",
  },
});
export default QA_answer;
