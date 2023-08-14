import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { BoardArticle, BoardType } from "../../types/Board";
import PostSummary from "./PostSummary";

const DetailBoardList = () => {
  // const route = useRoute();
  // const params = route.params as NavigationProps["DetailList"];
  // console.log(params?.boardType);
  // const boardType = params?.boardType;

  const params = useRoute().params as { boardType: BoardType };
  const boardType = params?.boardType;

  const [boardData] = useState<BoardArticle[]>([]);
  // // useEffect(() => {
  //   listArticle(params?.boardType).then((data: BoardArticle[]) => {
  //     setboardData(data);
  //   });
  // }, []);
  return (
    <ScrollView style={styles.container}>
      {boardData.map(board => (
        <View key={board.boardId} style={styles.body}>
          <Pressable onPress={() => console.log(board.title)}>
            <Text style={styles.board}>{boardType.name}</Text>
            <PostSummary post={board} boardType={boardType} />
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
