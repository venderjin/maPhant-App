import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { listArticle } from "../../Api/board";
import { NavigationProps } from "../../Navigator/Routes";
import { BoardArticle, BoardType } from "../../types/Board";
import ScrollList from "./ScrollList";
// const { width: SCREEN_WIDTH } = Dimensions.get("window");

const QnABoard: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const params = useRoute().params as { boardType: BoardType };
  const boardType = params?.boardType;
  const [boardData, setboardData] = useState<BoardArticle[]>([]);

  useEffect(() => {
    listArticle(1, 10, "likeCnt")
      .then(data => {
        if (data.data) setboardData(data.data as BoardArticle[]);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.total}>
        <View style={styles.hHead}>
          <Text style={styles.hFont}>
            {" "}
            HOT 게시글
            <MaterialCommunityIcons name="fire" size={25} color="black" />
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailList" as never);
            }}
          >
            <Text style={styles.detail}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {boardData.map(board => (
            <View key={board.boardId} style={styles.content}>
              <ScrollList post={board} boardType={boardType} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View>
        <TextInput placeholder="aiwebfjiabdnjk"></TextInput>
      </View>
      <View style={styles.total}>
        <View style={styles.hHead}>
          <Text style={styles.hFont}> 최신 게시글</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailList" as never);
            }}
          >
            <Text style={styles.detail}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {boardData.map(board => (
            <View key={board.boardId} style={styles.content}>
              <ScrollList post={board} boardType={boardType} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  detail: {
    fontSize: 15,
    color: "gray",
    justifyContent: "flex-end",
  },
  total: {
    marginBottom: 50,
  },
  hHead: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  hFont: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "skyblue",
    justifyContent: "space-between",
    minWidth: 200,
    minHeight: 90,
    padding: 20,
    marginRight: 10,
  },
});

export default QnABoard;
