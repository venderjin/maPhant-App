import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";

import { boardPost } from "../../Api/board";
import { BoardType } from "../../App/Board/BoardList";
import { Container, Input, Spacer, TextButton } from "../../components/common";

interface WriteProps {
  boardType: BoardType;
}

const Post: React.FC<WriteProps> = ({ boardType }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [checkList, setCheckList] = useState<string[]>([]);

  useEffect(() => {
    // 받아온 게시판 타입(boardType)을 이용하여 필요한 작업 수행
    console.log("게시판 타입:", boardType);
  }, [boardType]);

  const check = (name: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckList([...checkList, name]);
    } else {
      setCheckList(checkList.filter(choice => choice !== name));
    }
  };

  const categoryId = 3;
  const userId = 1;

  const complete = async () => {
    try {
      const response = await boardPost(
        null,
        categoryId,
        userId,
        boardType.id,
        title,
        body,
        0,
        1,
        1,
      );
      console.log("게시물 작성 성공", response);
    } catch (error) {
      console.error("게시물 작성 오류", error);
    }
  };

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
