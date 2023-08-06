import { useNavigation, useRoute } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

import { boardPost } from "../../Api/board";
import { BoardType } from "../../App/Board/BoardList";
import { Container, Input, Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";
import { UserData } from "../../types/User";

// interface WriteProps {
//   boardType: BoardType;
// }

const Post: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [checkList, setCheckList] = useState<string[]>([]);

  const params = useRoute().params as { boardType: BoardType };
  const boardType = params?.boardType;
  const navigation = useNavigation<NavigationProps>();

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
  const category = useSelector(UserStorage.userCategorySelector);

  const complete = async () => {
    try {
      const response = await boardPost(
        null,
        category.categoryId,
        user.id,
        boardType.id,
        title,
        body,
        0,
        1,
        1,
      );
      console.log("게시물 작성 성공", response);
      // console.log(categoryId, userId, boardType.id, title, body);
      navigation.navigate("DetailList" as never);
    } catch (error) {
      console.error("게시물 작성 오류", error);
    }
  };

  return (
      <Container isFullScreen={true}>
        <Container style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Container style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
          <Container style={{ flexDirection: "row", marginRight: 10 }}>
            <CheckBox style={{ marginRight: 5 }}
              value={checkList.includes("private")}
              onValueChange={isChecked => check("private", isChecked)}
            ></CheckBox>
            <Text>비공개</Text>
          </Container>
          <Container style={{ flexDirection: "row" }}>
            <CheckBox style={{ marginRight: 5 }}
              value={checkList.includes("anonymous")}
              onValueChange={isChecked => check("anonymous", isChecked)}
            ></CheckBox>
            <Text>익명</Text>
          </Container>
          </Container>
          <Container style={{ flexDirection: "row" }}>
          <TextButton onPress={complete}>완료</TextButton>
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
      </Container>
  );
};

export default Post;
