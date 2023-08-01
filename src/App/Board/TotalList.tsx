import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { BoardPostMockup } from "../../types/Board";
import { listArticle } from "../../Api/board";
import PostSummary from "./PostSummary";

const DetailBoardList = () => {
  const [boardData, setboardData] = useState<BoardPostMockup[]>([]);
  useEffect(() => {
    listArticle("all", 1).then((data: BoardPostMockup[]) => {
      setboardData(data);
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      {boardData.map(board => (
        <View key={board.id} style={styles.body}>
          <Pressable onPress={() => console.log(board.title)}>
            <Text style={styles.board}>{board.board}</Text>
            <PostSummary post={board} />
          </Pressable>
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
  board: {
    fontSize: 10,
    color: "gray",
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingVertical: 10,
  },
});

export default DetailBoardList;
