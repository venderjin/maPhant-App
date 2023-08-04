import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { listArticle } from "../../Api/board";
import { BoardArticle, BoardType } from "../../types/Board";
import PostSummary from "./PostSummary";
const DetailList: React.FC = () => {
  const params = useRoute().params as { boardType: BoardType };
  const boardType = params?.boardType;
  const [boardData, setboardData] = useState<BoardArticle[]>([]);

  useEffect(() => {
    listArticle(1)
      .then(data => {
        if (data.data) setboardData(data.data as BoardArticle[]);
      })
      .catch(err => console.log(err));
  }, []);
  const createBoard = () => {
    console.log("글쓰기 화면으로 바뀌어야함");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {boardData.map(board => (
          <View key={board.boardId} style={styles.body}>
            <Pressable onPress={() => console.log(board.title)}>
              <PostSummary post={board} boardType={boardType} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={styles.btn}>
        <TouchableOpacity onPress={createBoard}>
          <Text>
            <Entypo name="plus" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  btn: {
    backgroundColor: "#e9ecef",
    borderRadius: 30,
    zIndex: 99,
    position: "absolute",
    right: "10%",
    bottom: "5%",
    padding: 10,
  },
});
export default DetailList;
