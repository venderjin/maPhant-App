import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";

import { Container, Input, Spacer, TextButton } from "../../components/common";

const Post: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [checkList, setCheckList] = useState<string[]>([]);

  const check = (name: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckList([...checkList, name]);
    } else {
      setCheckList(checkList.filter(choice => choice !== name));
    }
  };

  const complete = async () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container isFullScreen={true}>
        <Container style={{ flexDirection: "row" }}>
          <Container style={{ flexDirection: "row" }}>
            <CheckBox
              value={checkList.includes("private")}
              onValueChange={isChecked => check("private", isChecked)}
            ></CheckBox>
            <Text>비공개</Text>
          </Container>
          <Container style={{ flexDirection: "row" }}>
            <CheckBox
              value={checkList.includes("anonymous")}
              onValueChange={isChecked => check("anonymous", isChecked)}
            ></CheckBox>
            <Text>익명</Text>
          </Container>
        </Container>
        <Container>
          <Input
            placeholder="제목"
            onChangeText={text => setTitle(text)}
            value={title}
            multiline={true}
          ></Input>
          <Spacer size={20} />
          <Input
            style={{ height: 500 }}
            placeholder="본문"
            onChangeText={text => setBody(text)}
            value={body}
            multiline={true}
          ></Input>
        </Container>
        <TextButton onPress={complete}>완료</TextButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Post;
