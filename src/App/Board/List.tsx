import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, Text } from "react-native";

import PostSummary from "./PostSummary";
import { BoardPost, BoardPostMockup } from "../../types/Board";
import { listArticle } from "../../Api/board";

import { Entypo } from "@expo/vector-icons";
const DetailList: React.FC = () => {
  const [boardData, setboardData] = useState<BoardPostMockup[]>([]);
  useEffect(() => {
    listArticle("all", 1).then((data: BoardPostMockup[]) => {
      setboardData(data);
    });
  }, []);
  const createBoard = () => {
    console.log("글쓰기 화면으로 바뀌어야함");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {boardData.map(board => (
          <View key={board.id} style={styles.body}>
            <Pressable onPress={() => console.log(board.title)}>
              <PostSummary post={board} />
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
