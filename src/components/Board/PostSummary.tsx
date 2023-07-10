import React from "react";
import { BoardPost, BoardPostMockup } from "../../types/Board";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function ({ post }: { post: BoardPostMockup }): JSX.Element {
  switch (post.board) {
    default:
      return PostSummary(post);
  }
}

function PostSummary(post: BoardPostMockup): JSX.Element {
  return (
    <View style={styles.body}>
      <Pressable onPress={() => console.log(post.title)}>
        {post.board == "" ? (
          <></>
        ) : (
          <Text style={styles.board}>{post.board}</Text>
        )}
        <View style={styles.head}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.userName}>{post.userName}</Text>
        </View>
        <View>
          <Text style={styles.comment} numberOfLines={1}>
            {post.comment}
          </Text>
        </View>
        <View style={styles.head}>
          {post.good > 0 ? (
            <>
              <Feather name="thumbs-up" size={13} color="tomato" />
              <Text style={styles.good}>&#9; {post.good}</Text>
            </>
          ) : post.command == 0 ? (
            <View style={{ flex: 1 }}></View>
          ) : null}
          {post.command > 0 ? (
            <>
              <FontAwesome name="comment-o" size={13} color="blue" />
              <Text style={styles.command}>&#9; {post.command}</Text>
            </>
          ) : null}
          <Text style={{ justifyContent: "flex-end", fontSize: 10 }}>
            {post.created}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
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
  comment: {
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
  command: {
    flex: 9,
    fontSize: 10,
  },
});
