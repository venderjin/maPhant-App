import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import { boardDelete, boardEdit, getArticle } from "../../Api/board";
import { Container, IconButton, Input, TextButton } from "../../components/common";
import UserStorage from "../../storage/UserStorage";
import { BoardArticle, BoardPost } from "../../types/Board";
import { NavigationProps } from "../../types/Navigation";
import { UserData } from "../../types/User";

const data = [
  {
    id: 1,
    name: "jingjing",
    date: "2023.05.08",
  },
  {
    id: 2,
    name: "ahdjfad",
    date: "2024.12.22",
  },
  { id: 3, name: "지망이", date: " 2023.03.12" },
];

const BoardDetail = () => {
  const params = useRoute().params as { boardData: BoardArticle };
  const boardData = params?.boardData;
  const [post, setPost] = useState({ board: {} } as BoardPost);
  const user = useSelector(UserStorage.userProfileSelector)! as UserData;
  const navigation = useNavigation<NavigationProp<NavigationProps>>();

  const createdAtDate = new Date(post.board.createdAt);
  const formattedDateTime = createdAtDate.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleDelete = async (board_id: number) => {
    try {
      const response = await boardDelete(board_id);
      navigation.navigate("DetailList" as never);
      console.log("삭제 성공", response);
    } catch (error) {
      console.error("삭제 오류", error);
    }
  };
  // console.log(boardData)
  // console.log(post);
  const handleUpdate = async () => {
    try {
      const response = await boardEdit(
        post.board.id,
        post.board.title,
        post.board.body,
        post.board.isHide,
      );
      console.log("수정 가능", response);
      navigation.navigate("editPost", { post: post, boardType: boardData });
    } catch (error) {
      console.error("수정 오류", error);
    }
  };

  useEffect(() => {
    getArticle(boardData.boardId)
      .then(data => {
        if (data.data) setPost(data.data as BoardPost);
      })
      .catch();
  }, []);

  function alert() {
    Alert.alert("삭제", "삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          handleDelete(boardData.boardId);
        },
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  }

  return (
    <>
      <ScrollView style={styles.scroll}>
        <Container style={styles.container}>
          <View style={styles.infoBox}>
            <View>
              <View style={styles.header}>
                <View>
                  <View>
                    <Text style={styles.nickname}>{boardData.userNickname}</Text>
                  </View>
                  <View>
                    <Text style={styles.date}>{formattedDateTime}</Text>
                  </View>
                </View>
                {user.nickname === boardData.userNickname && (
                  <View style={styles.buttonBox}>
                    <TextButton style={styles.button} fontSize={13} onPress={handleUpdate}>
                      수정
                    </TextButton>
                    <TextButton style={styles.button} fontSize={13} onPress={alert}>
                      삭제
                    </TextButton>
                  </View>
                )}
              </View>
              <View style={styles.contextBox}>
                <View>
                  <Text style={styles.title}>{post.board.title}</Text>
                </View>
                <View>
                  <Text style={styles.context}>{post.board.body}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cbutBox}>
              <IconButton name="thumbs-o-up" color="skyblue" onPress={() => console.log("추천")}>
                추천
              </IconButton>
              <IconButton name="star-o" color="orange" onPress={() => console.log("스크랩")}>
                스크랩
              </IconButton>
              <IconButton name="exclamation-circle" color="red" onPress={() => console.log("신고")}>
                신고
              </IconButton>
            </View>
          </View>
          {data.map(answer => (
            <View style={styles.commentBox} key={answer.id}>
              <View style={styles.line} />
              <View style={{ flex: 1, margin: "3%" }}>
                <View style={styles.commentHeader}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 15,
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.commentName}>{answer.name}</Text>
                    <Text style={styles.commentDate}>{answer.date}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                    <TextButton
                      style={styles.button}
                      fontSize={13}
                      onPress={() => console.log("수정")}
                    >
                      수정
                    </TextButton>
                    <TextButton
                      style={styles.button}
                      fontSize={13}
                      onPress={() => console.log("삭제")}
                    >
                      삭제
                    </TextButton>
                  </View>
                  <View></View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={styles.commentContext}>
                    <Text numberOfLines={3} style={styles.context}>
                      내용dfadsfadsdfasdfasdfasdfefhidfhiwhjhuuadjfabdsjfuehjvjabdsuvheujadbvjbadsjvbjdsbhbah
                    </Text>
                  </View>
                  <View style={styles.cbutBox}>
                    <IconButton
                      name="comment"
                      color="skyblue"
                      onPress={() => console.log("대댓글")}
                    >
                      대댓글
                    </IconButton>
                    <IconButton
                      name="thumbs-o-up"
                      color="skyblue"
                      onPress={() => console.log("추천")}
                    >
                      추천
                    </IconButton>
                    <IconButton
                      name="exclamation-circle"
                      color="red"
                      onPress={() => console.log("신고")}
                    >
                      신고
                    </IconButton>
                  </View>
                </View>

                <View style={styles.replyBox}>
                  <View style={styles.line} />
                  <View style={{ margin: "2%" }}>
                    <View style={styles.commentHeader}>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.commentName}>{answer.name}</Text>
                        <Text style={styles.commentDate}>{answer.date}</Text>
                      </View>
                      <View style={styles.cbutBox}>
                        <IconButton
                          name="thumbs-o-up"
                          color="skyblue"
                          onPress={() => console.log("추천")}
                        >
                          추천
                        </IconButton>
                        <IconButton
                          name="exclamation-circle"
                          color="red"
                          onPress={() => console.log("신고")}
                        >
                          신고
                        </IconButton>
                        <IconButton name="" color="skyblue" onPress={() => console.log("수정")}>
                          수정
                        </IconButton>
                        <IconButton name="" color="red" onPress={() => console.log("삭제")}>
                          삭제
                        </IconButton>
                      </View>
                      <View></View>
                    </View>
                    <View style={styles.commentContext}>
                      <Text style={styles.context}>
                        내용dfadsfadsdfasdfasdfasdfefhidfhiwhjhuuadjfabdsjfuehjvjabdsuvheujadbvjbadsjvbjdsbhbah
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Container>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ padding: 5, borderRadius: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Input
            style={{
              flex: 1,
              backgroundColor: "white",
              paddingVertical: 15,
              paddingHorizontal: 12,
              marginRight: 5,
            }}
            placeholder="댓글을 작성해 주세요 ..."
          ></Input>
          <TextButton>작성</TextButton>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flex: 1,
  },
  nameBox: {
    flex: 1,
    padding: "3%",
    justifyContent: "space-between",
  },
  headername: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoBox: {
    justifyContent: "space-between",
    flex: 5,
    padding: "4%",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonBox: {
    flexDirection: "row",
  },
  nickname: {
    fontSize: 20,
  },
  date: {
    marginLeft: 5,
    fontSize: 10,
    color: "gray",
  },
  contextBox: {
    margin: "5%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  context: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 17,
  },
  button: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 11,
    marginHorizontal: 4,
    backgroundColor: "#f2f2f2",
  },

  cbutBox: {
    flexDirection: "row",
  },
  commentBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#f2f2f2",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  commentName: {
    fontSize: 15,
    marginRight: 5,
  },
  commentDate: {
    marginTop: 5,
    fontSize: 11,
    color: "lightgray",
    // marginLeft: 10,
  },
  commentContext: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  // touchdetail: {
  //   margin: "3%",
  // },
  scroll: {
    height: "30%",
  },
  replyBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxHeight: 180,
    overflow: "hidden",
    margin: 20,
  },
});

export default BoardDetail;
