import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BoardArticle, BoardType } from "../../types/Board";

export default function ({
  post,
  boardType,
}: {
  post: BoardArticle;
  boardType: BoardType;
}): JSX.Element {
  switch (boardType) {
    default:
      return ScrollList(post);
  }
}
function ScrollList(post: BoardArticle): JSX.Element {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.hBody}>
        <Text style={styles.title}>{post.title} </Text>
        {/* <Text style={styles.comment}>{post.content}</Text> */}
      </View>
      <View style={styles.bottom}>
        <Text style={styles.userName}>{post.userNickname}</Text>
        <Text style={styles.created}>{post.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 200,
    minHeight: 150,
    padding: 10,
  },
  hBody: {
    flex: 2,
  },
  title: {
    fontSize: 20,
    maxWidth: 200,
  },
  comment: {
    fontSize: 15,
    marginVertical: 10,
    paddingBottom: 10,
    marginRight: "50%",
  },
  bottom: {
    flex: 1,
    paddingTop: "10%",
    fontSize: 10,
    flexDirection: "row",
  },
  userName: {
    flex: 1,
    justifyContent: "flex-start",
    fontSize: 10,
    color: "gray",
  },
  created: {
    justifyContent: "flex-end",
    fontSize: 10,
  },
});
