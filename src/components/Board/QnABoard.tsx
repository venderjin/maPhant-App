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

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

const boardData = [
  {
    id: 1,
    title: "HI",
    comment: "안녕하세요",
    userName: "김민수",
    created: "20분 전",
    good: 0,
    command: 0,
  },
  {
    id: 2,
    title: "Hello",
    comment: "안녕하세요",
    userName: "anjgkwl",
    created: "30분 전",
    good: 2,
    command: 2,
  },
  {
    id: 3,
    title: "How are you?",
    comment: "안녕하세요 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    userName: "dkanrjsk",
    created: "1시간 전",
    good: 8,
    command: 5,
  },
  {
    id: 4,
    title: "I'm fine, thank you.",
    comment: "안녕하세요",
    userName: "dkanrjsk",
    created: "3시간 전",
    good: 0,
    command: 5,
  },
  {
    id: 5,
    title: "And you?",
    comment: "안녕하세요",
    userName: "dkanrjsk",
    created: "2023-06-30",
    good: 8,
    command: 0,
  },
  {
    id: 6,
    title: "Good bye.",
    comment: "안녕하세요",
    userName: "dkssud",
    created: "2023-06-30",
    good: 7,
    command: 5,
  },
  {
    id: 7,
    title: "See you tomorrow.",
    comment: "안녕하세요",
    userName: "dkanrjsk",
    created: "2023-06-30",
    good: 8,
    command: 5,
  },
];

const QnABoard = () => {
  const navigation = useNavigation();
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
              navigation.navigate("DetailBoardList" as never);
            }}
          >
            <Text style={styles.detail}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.scroll}>
          {boardData.map((board) => (
            <View key={board.id} style={styles.content}>
              <View style={styles.hBody}>
                <Text style={styles.title}>{board.title} </Text>
                <Text style={styles.comment}>{board.comment}</Text>
              </View>
              <View style={styles.bottom}>
                <Text style={styles.userName}>{board.userName}</Text>
                <Text style={styles.created}>{board.created}</Text>
              </View>
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
        <ScrollView horizontal contentContainerStyle={styles.scroll}>
          {boardData.map((board) => (
            <View key={board.id} style={styles.content}>
              <View style={styles.hBody}>
                <Text style={styles.title} numberOfLines={1}>
                  {board.title}{" "}
                </Text>
                <Text style={styles.comment} numberOfLines={1}>
                  {board.comment}
                </Text>
              </View>
              <View style={styles.bottom}>
                <Text style={styles.userName}>{board.userName}</Text>
                <Text style={styles.created}>{board.created}</Text>
              </View>
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
  scroll: {},
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

export default QnABoard;
