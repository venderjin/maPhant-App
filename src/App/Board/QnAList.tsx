import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ScrollList from "../../components/Board/ScrollList";
import { useEffect, useState } from "react";
import { listArticle } from "../../Api/board";
import { BoardPostMockup } from "../../types/Board";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

const QnABoard = () => {
  const navigation = useNavigation();
  const [boardData, setboardData] = useState<BoardPostMockup[]>([]);
  useEffect(() => {
    listArticle("all", 1).then((data: BoardPostMockup[]) => {
      setboardData(data);
    });
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
              navigation.navigate("List" as never);
            }}
          >
            <Text style={styles.detail}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {boardData.map((board) => (
            <View key={board.id} style={styles.content}>
              <ScrollList post={board} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.total}>
        <View style={styles.hHead}>
          <Text style={styles.hFont}> 답변 기다리는 게시글</Text>
          <TouchableOpacity>
            <Text style={styles.detail}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {boardData.map((board) => (
            <View key={board.id} style={styles.content}>
              <ScrollList post={board} />
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
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    minWidth: 200,
    minHeight: 90,
    padding: 20,
    marginRight: 10,
  },
});

export default QnABoard;
