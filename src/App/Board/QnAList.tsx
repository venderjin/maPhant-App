import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { listArticle, listHotBoard } from "../../Api/board";
import { Container } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import { BoardArticle, BoardType, HotBoard } from "../../types/Board";
import ScrollList from "./ScrollList";

const QnABoard: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const params = useRoute().params as { boardType: BoardType };
  const boardType = params?.boardType;
  const [boardData, setboardData] = useState<BoardArticle[]>([]);
  const [hotBoard, setHotBoard] = useState<HotBoard[]>([]);
  // const [sort, setSort] = useState<SortType>();

  // sortCriterion()
  //   .then(data => {
  //     setSort(data.data as SortType);
  //   })
  //   .catch(err => console.log(err));

  useEffect(() => {
    listHotBoard(boardType.id, 1, 50)
      .then(data => {
        if (data.data) setHotBoard(data.data.list as HotBoard[]);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    listArticle(boardType.id, 1, 50, 1)
      .then(data => {
        if (data.data) setboardData(data.data as BoardArticle[]);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <Container style={styles.container}>
      <View style={styles.total}>
        <View style={styles.hHead}>
          <Text style={styles.hFont}>
            {" "}
            HOT 게시글
            <MaterialCommunityIcons name="fire" size={25} color="black" />
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailList", { boardType: boardType });
            }}
          >
            <Text style={styles.detail}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {hotBoard.map(board => (
            <View key={board.id} style={styles.content}>
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
              navigation.navigate("DetailList", { boardType: boardType });
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
    </Container>
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
