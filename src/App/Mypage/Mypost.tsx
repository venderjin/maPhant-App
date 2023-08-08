import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GetAPI } from "../../Api/fetchAPI";
import { BoardArticle } from "../../types/Board";

export default function (): JSX.Element {
  switch (0) {
    default:
      return MyPost();
  }
}

function MyPost(): JSX.Element {
  const [posts, setPosts] = React.useState<BoardArticle[]>([]);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    GetAPI(`/profile/board?page=${pages}&recordSize=${5}`).then(res => {
      if (res.success === false) {
        console.log(res.errors);
        return;
      } else {
        setPosts([...posts, ...res.data.list]);
        // if (res.data.pagination.existNextPage === false) {
        //   setStop(true);
        // }
      }
    });
  }, [pages]);

  const loadMorePosts = () => {
    if (!isLoading) {
      setIsLoading(true);
      setPages(pages + 1);
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleScroll(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + scrollViewHeight >= contentHeight - 20) {
      loadMorePosts();
    }
  }

  const detailContent = (boards: BoardArticle) => {
    console.log(posts);
    navigation.navigate("QnAdetail", { posts: boards });
  };

  return (
    <>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {posts.map(post => (
          <>
            <Pressable onPress={() => detailContent(post)}>
              <View style={styles.container}>
                <View style={styles.head}>
                  <Text style={styles.title}>{post.title}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View style={styles.time}>
                    <Text>{post.type}</Text>
                  </View>
                  <View style={styles.time}>
                    <Text>{dateToString(post.created_at)}</Text>
                  </View>
                </View>

                <View style={styles.head}>
                  {post.likeCnt > 0 ? (
                    <>
                      <Feather name="thumbs-up" size={13} color="tomato" />
                      <Text style={styles.good}>&#9; {post.likeCnt}</Text>
                    </>
                  ) : post.commentCnt == 0 ? (
                    <View style={{ flex: 1 }}></View>
                  ) : null}
                  {post.commentCnt > 0 ? (
                    <>
                      <FontAwesome name="comment-o" size={13} color="blue" />
                      <Text style={styles.comment}>&#9; {post.commentCnt}</Text>
                    </>
                  ) : null}
                  <Text style={{ justifyContent: "flex-end", fontSize: 10 }}></Text>
                </View>
              </View>
            </Pressable>
          </>
        ))}
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
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    justifyContent: "flex-start",
    fontWeight: "bold",
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
});
