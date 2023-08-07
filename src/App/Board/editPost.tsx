import { useNavigation, useRoute } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

import { boardEdit, boardPost } from "../../Api/board";
import { BoardType } from "../../App/Board/BoardList";
import { Container, Input, Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";
import { BoardPost } from "../../types/Board";
import { UserCategory, UserData } from "../../types/User";

const Edit: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isanonymous, setIsanonymous] = useState(0);
  const [isHide, setIsHide] = useState(0);

  const boardparams = useRoute().params as { boardType: BoardType };
  const boardType = boardparams?.boardType;
  const navigation = useNavigation<NavigationProps>();

  const editparams = useRoute().params as { post: BoardPost };
  const post = editparams?.post;
  console.log(post);
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

  const user = useSelector(UserStorage.userProfileSelector)! as UserData;
  const category = useSelector(UserStorage.userCategorySelector) as UserCategory;

  const handleUpdate = async () => {
    try {
      const response = await boardEdit(
        post.board.id,
        post.board.title,
        post.board.body,
        post.board.isHide,
      );
      console.log("수정 가능", response);
      navigation.navigate("DetailList", { boardType: boardType });
    } catch (error) {
      console.error("수정 오류", error);
    }
  };

  return (
    <Container isFullScreen={true}>
      <Container style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Container
          style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}
        >
          <Container style={{ flexDirection: "row", marginRight: 10 }}>
            <CheckBox
              style={{ marginRight: 5 }}
              value={checkList.includes("private")}
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
              value={checkList.includes("anonymous")}
              onValueChange={isChecked => {
                check("anonymous", isChecked);
                setIsanonymous(isChecked ? 1 : 0);
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
          value={post.board.title}
          multiline={true}
        ></Input>
        <Spacer size={20} />
        <Input
          style={{ height: 500 }}
          placeholder="본문"
          onChangeText={text => setBody(text)}
          value={post.board.body}
          multiline={true}
        ></Input>
      </Container>
    </Container>
  );
};

export default Edit;
