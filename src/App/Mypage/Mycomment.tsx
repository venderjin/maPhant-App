import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { DeleteAPI, GetAPI, PostAPI } from "../../Api/fetchAPI";
import { TextButton } from "../../components/common";
import UserStorage from "../../storage/UserStorage";
import { BoardArticle } from "../../types/Board";

export default function (): JSX.Element {
  switch (0) {
    default:
      return Mycomment();
  }
}

function Mycomment(): JSX.Element {
  const [comments, setComments] = useState<BoardArticle[] & { body: string }[]>([]);
  const [endPage, setEndPage] = React.useState<number>(0);
  const [pages, setPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const navigation = useNavigation();

  const recordSize: number = 10;
  const userID: number = useSelector(UserStorage.userProfileSelector)!.id;

  useEffect(() => {
    GetAPI(`/profile/comment?page=${pages}&recordSize=${recordSize}&targetUserId=${userID}`).then(
      res => {
        if (res.success === false) {
          console.log(res.errors);
          return;
        } else {
          setComments([...comments, ...res.data.list]);
          setEndPage(res.data.pagination.endPage);
        }
      },
    );
  }, [pages]);

  const loadMorecomments = async () => {
    if (!isLoading) {
      setIsLoading(true);

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (pages === endPage) {
        setIsComplete(true);
      } else if (pages < endPage) {
        setPages(pages + 1);
      }
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleScroll(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + scrollViewHeight >= contentHeight - 20) {
      loadMorecomments();
    }
  }

  const detailContent = (comments: BoardArticle) => {
    console.log(comments.board_id);
    navigation.navigate("BoardDetail", { id: comments.board_id });
  };

  return (
    <>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {comments.map(comment => (
          <>
            <Pressable onPress={() => detailContent(comment)}>
              <View style={styles.container}>
                <View style={styles.head}>
                  <View style={{ marginRight: 20 }}>
                    <Text>{comment.board_type}</Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <View>
                    <Text style={styles.title}>{comment.board_title}</Text>
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <View>
                    <Text style={styles.comment}>내 댓글 : {comment.body}</Text>
                  </View>
                </View>

                <View style={styles.head}>
                  <Feather name="thumbs-up" size={13} color="tomato" />
                  <Text style={styles.good}>&#9; {comment.like_cnt}</Text>
                  <View style={{ flex: 1 }}></View>
                  {/* <FontAwesome name="comment-o" size={13} color="blue" />
                  <Text style={styles.comment}>&#9; {comments.comment_cnt}</Text> */}
                  <Text style={{ justifyContent: "flex-end", fontSize: 10 }}></Text>
                  <Text style={styles.time}>{dateToString(comment.created_at)}</Text>
                </View>
              </View>
            </Pressable>
            <View style={{ borderBottomWidth: 1, borderColor: "#e8eaec", height: 0 }}></View>
          </>
        ))}
        {(isLoading || isComplete) && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              ) : (
                "이전 댓글이 없습니다."
              )}
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

function dateToString(date: string): string {
  const start = new Date(date);
  const end = new Date();

  const diff = end.getTime() - start.getTime();
  const diffDate = new Date(diff);

  const year = diffDate.getFullYear() - 1970;
  const month = diffDate.getMonth();
  const day = diffDate.getDate() - 1;
  const hour = diffDate.getHours();
  const minute = diffDate.getMinutes();
  const second = diffDate.getSeconds();

  if (year > 0) return `${year}년 전`;
  if (month > 0) return `${month}달 전`;
  if (day > 0) return `${day}일 전`;
  if (hour > 0) return `${hour}시간 전`;
  if (minute > 0) return `${minute}분 전`;
  if (second > 0) return `${second}초 전`;
  return "방금 전";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margintop: 10,
  },
  head: {
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  comment: {
    fontSize: 10,
    justifyContent: "flex-start",
  },
  board: {
    fontSize: 10,
    color: "gray",
  },
  content: {
    fontSize: 15,
    marginVertical: 5,
    marginRight: "50%",
  },
  time: {
    alignItems: "flex-end",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  good: {
    flex: 1,
    fontSize: 10,
    justifyContent: "flex-start",
  },
  comment: {
    flex: 9,
    fontSize: 10,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  loadingText: {
    fontSize: 16,
    color: "gray",
  },
});
