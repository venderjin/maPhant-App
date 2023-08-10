import { useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import {
  boardDelete,
  boardEdit,
  commentArticle,
  commentDelete,
  commentInsert,
  commentReply,
  getArticle,
} from "../../Api/board";
import { Container, IconButton, Input, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";
import { BoardArticleBase, BoardPost, commentType } from "../../types/Board";
import { UserData } from "../../types/User";
import { dateFormat, dateTimeFormat } from "./Time";

const BoardDetail = () => {
  const params = useRoute().params as { id: number; preRender?: BoardArticleBase };
  const { id, preRender } = params;

  const [comments, setcomments] = useState<commentType[]>([]);
  const [replies, setReplies] = useState<{ [commentId: number]: commentType[] | undefined }>({});
  const [post, setPost] = useState({ board: {} } as BoardPost);
  // const [post, setPost] = useState({ board: preRender } as BoardPost);
  const [body, setBody] = useState("");
  const [replyBody, setReplyBody] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState(0);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [parent_id, setParentId] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const user = useSelector(UserStorage.userProfileSelector)! as UserData;
  const navigation = useNavigation<NavigationProps>();

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
        post.board.boardId,
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

  const handlecommentInsert = async () => {
    try {
      const response = await commentInsert(user.id, id, body, isAnonymous);
      console.log("댓글 작성 성공", response);
      setBody("");
      setIsAnonymous(0);
      Keyboard.dismiss();
    } catch (error) {
      console.log("댓글 작성 오류", error);
    }
  };

  const handleCommentDelete = async (id: number) => {
    try {
      const response = await commentDelete(id);
      console.log(response);
    } catch (error) {
      console.log("댓글 삭제 오류", error);
    }
  };

  const handleReplyInput = async (parent_id: number, body: string) => {
    try {
      const response = await commentReply(user.id, id, parent_id, body, isAnonymous);
      console.log(response);
      console.error(user.id, id, parent_id, body, isAnonymous);

      setReplies(prevReplies => {
        const newReplies = {
          ...prevReplies,
          [parent_id]: [...(prevReplies[parent_id] || []), response.data],
        };
        return newReplies;
      });
      setReplyBody("");
      setIsAnonymous(0);
    } catch (error) {
      console.log("대댓글 오류", error);
    }
  };

  const check = (name: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckList([...checkList, name]);
    } else {
      setCheckList(checkList.filter(choice => choice !== name));
    }
  };

  useEffect(() => {
    getArticle(id)
      .then(data => {
        if (data.data) setPost(data.data as BoardPost);
      })
      .catch();

    commentArticle(id, 1)
      .then(response => {
        if (response.data) setcomments(response.data as commentType[]);

        const repliesData = response.data as commentType[];
        const repliesMap: { [commentId: number]: commentType[] } = {};

        repliesData.forEach(reply => {
          if (reply.parent_id) {
            if (!repliesMap[reply.parent_id]) {
              repliesMap[reply.parent_id] = [];
            }
            repliesMap[reply.parent_id].push(reply);
          }
        });

        setReplies(repliesMap);
      })
      .catch();
  }, []);

  function alert() {
    Alert.alert("삭제", "삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          handleDelete(id);
        },
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  }
  function alertComment(id: number) {
    Alert.alert("삭제", "삭제하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          handleCommentDelete(id);
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
                    <Text style={styles.nickname}>{post.board.userId}</Text>
                  </View>
                  <View>
                    <Text style={styles.date}>{dateTimeFormat(post.board.createdAt)}</Text>
                  </View>
                </View>
                {user.id === post.board.userId && (
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
          {comments.map(comment => (
            <View style={styles.commentBox} key={comment.id}>
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
                    <Text style={styles.commentName}>{comment.nickname}</Text>
                    <Text style={styles.commentDate}>{dateFormat(comment.created_at)}</Text>
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
                      onPress={() => {
                        alertComment(comment.id);
                      }}
                    >
                      삭제
                    </TextButton>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={styles.commentContext}>
                    <Text numberOfLines={3} style={styles.context}>
                      {comment.body}
                    </Text>
                  </View>
                  <View style={styles.cbutBox}>
                    <IconButton
                      name="comment"
                      color="skyblue"
                      onPress={() => {
                        setParentId(comment.id);
                        setChecked(!checked);
                      }}
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

                {parent_id === comment.id && (
                  <View style={styles.replyBox}>
                    <View style={styles.line} />
                    <View style={{ margin: "2%" }}>
                      <View style={styles.commentHeader}>
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.commentName}>{comment.nickname}</Text>
                          <Text style={styles.commentDate}>{dateFormat(comment.created_at)}</Text>
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
                          <IconButton
                            name=""
                            color="red"
                            onPress={() => handleCommentDelete(parent_id)}
                          >
                            삭제
                          </IconButton>
                        </View>
                      </View>
                      <View style={styles.commentContext}>
                        {replies[comment.id]?.map(reply => (
                          <Text key={reply.id} numberOfLines={3} style={styles.context}>
                            {reply.body}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
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
          <Checkbox
            style={{ marginRight: 5 }}
            value={checkList.includes("anonymous")}
            onValueChange={isChecked => {
              check("anonymous", isChecked);
              setIsAnonymous(isChecked ? 1 : 0);
            }}
          ></Checkbox>
          <Text>익명</Text>
          <Input
            style={{
              flex: 1,
              backgroundColor: "white",
              paddingVertical: 15,
              paddingHorizontal: 12,
              marginRight: 5,
            }}
            placeholder={checked ? "대댓글을 작성해 주세요 ..." : "댓글을 작성해 주세요 ..."}
            value={checked ? replyBody : body}
            onChangeText={checked ? setReplyBody : setBody}
          ></Input>
          <TextButton
            onPress={() => {
              checked ? handleReplyInput(parent_id, replyBody) : handlecommentInsert();
            }}
          >
            작성
          </TextButton>
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
