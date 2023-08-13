import { useNavigation, useRoute } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { boardEdit } from "../../Api/board";
import { BoardType } from "../../App/Board/BoardList";
import { Container, Input, Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import { BoardPost } from "../../types/Board";

const Edit: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isHide, setIsHide] = useState<number>(0);
  const [isAnonymous, setIsAnonymous] = useState<number>(0);

  const boardparams = useRoute().params as { boardType: BoardType };
  const boardType = boardparams?.boardType;
  const navigation = useNavigation<NavigationProps>();

  const editparams = useRoute().params as { post: BoardPost };
  const post = editparams?.post;
  console.log(post);
  useEffect(() => {
    // 받아온 게시판 타입(boardType)을 이용하여 필요한 작업 수행
    setTitle(post.board.title);
    setBody(post.board.body);
    setIsHide(post.board.isHide);
    setIsAnonymous(post.board.isAnonymous);
    console.log("게시판 타입:", boardType);
  }, [boardType]);

  const check = (name: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckList([...checkList, name]);
    } else {
      setCheckList(checkList.filter(choice => choice !== name));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await boardEdit(post.board.boardId, title, body, isHide);
      console.log("수정 가능", response);
      navigation.navigate("DetailList", { boardType: boardType });
    } catch (error) {
      console.error("수정 오류", error);
    }
  };

  return (
    <Container>
      <Container style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Container
          style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}
        >
          <Container style={{ flexDirection: "row", marginRight: 10 }}>
            <CheckBox
              style={{ marginRight: 5 }}
              value={isHide == 1 ? true : false}
              onValueChange={isChecked => {
                check("private", isChecked);
                setIsHide(isChecked ? 1 : 0);
              }}
            ></CheckBox>
            <Text>비공개</Text>
          </Container>
          <Container style={{ flexDirection: "row" }}>
            <CheckBox
              style={{ marginRight: 5 }}
              value={isAnonymous == 1 ? true : false}
              onValueChange={isChecked => {
                check("anonymous", isChecked);
              }}
            ></CheckBox>
            <Text>익명</Text>
          </Container>
        </Container>
        <Container style={{ flexDirection: "row" }}>
          <TextButton onPress={handleUpdate}>완료</TextButton>
        </Container>
      </Container>
      <Container>
        <Input
          placeholder="연스으으으으으으으ㅡㅂ"
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
    </Container>
  );
};

export default Edit;
