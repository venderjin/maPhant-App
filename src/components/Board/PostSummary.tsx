import React from "react";
import { BoardPostMockup } from "../../types/Board";
import { StyleSheet, View, Text } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function ({ post }: { post: BoardPostMockup }): JSX.Element {
  switch (post.board) {
    default:
      return PostSummary(post);
  }
}

function PostSummary(post: BoardPostMockup): JSX.Element {
  return (
    <>
      <View style={styles.head}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.userName}>{post.userName}</Text>
      </View>
      <View>
        <Text style={styles.content} numberOfLines={1}>
          {post.content}
        </Text>
      </View>
      <View style={styles.head}>
        {post.good > 0 ? (
          <>
            <Feather name="thumbs-up" size={13} color="tomato" />
            <Text style={styles.good}>&#9; {post.good}</Text>
          </>
        ) : post.commant == 0 ? (
          <View style={{ flex: 1 }}></View>
        ) : null}
        {post.commant > 0 ? (
          <>
            <FontAwesome name="comment-o" size={13} color="blue" />
            <Text style={styles.commant}>&#9; {post.commant}</Text>
          </>
        ) : null}
        <Text style={{ justifyContent: "flex-end", fontSize: 10 }}>
          {post.created}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  userName: {
    fontSize: 10,
    color: "gray",
  },
  content: {
    fontSize: 15,
    marginVertical: 5,
    marginRight: "50%",
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
  commant: {
    flex: 9,
    fontSize: 10,
  },
});
