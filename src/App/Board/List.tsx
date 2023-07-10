import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import PostSummary from "../../components/Board/PostSummary";
import { BoardPost, BoardPostMockup } from "../../types/Board";
import { listArticle } from "../../Api/board";

const DetailBoardList = () => {
  const [boardData, setboardData] = useState<BoardPostMockup[]>([]);
  listArticle("all", 1).then((data: BoardPostMockup[]) => setboardData(data));
  return (
    <ScrollView style={styles.container}>
      {boardData.map((board) => (
        <View key={board.id}>
          <PostSummary post={board} />
        </View>
      ))}
    </ScrollView>
  );
};

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
export default DetailBoardList;
