import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const boardData = [
  {
    id: 1,
    board: "자유 게시판",
    icon: "user-circle-o",
    title: "HI",
    comment: "안녕하세요",
    userName: "김민수",
    created: "20분 전",
    add: "댓글",
    show: false,
  },
  {
    id: 2,
    board: "지식 게시판",
    icon: "globe",
    title: "Hello",
    comment: "안녕하세요",
    userName: "anjgkwl",
    created: "30분 전",
    add: "댓글",
    show: true,
  },
  {
    id: 3,
    board: "Q&A 게시판",
    icon: "question-circle-o",
    title: "How are you?",
    comment: "안녕하세요",
    userName: "dkanrjsk",
    created: "1시간 전",
    add: "댓글",
    show: true,
  },
  {
    id: 4,
    board: "HOT 게시판",
    icon: "firefox",
    title: "I'm fine, thank you.",
    comment: "안녕하세요",
    userName: "dkanrjsk",
    created: "3시간 전",
    add: "댓글",
    show: false,
  },
  {
    id: 5,
    board: "자유 게시판",
    icon: "user-circle-o",
    title: "And you?",
    comment: "안녕하세요",
    userName: "dkanrjsk",
    created: "2023-06-30",
    add: "댓글",
    show: false,
  },
  {
    id: 6,
    board: "자유 게시판",
    icon: "user-circle-o",
    title: "Good bye.",
    comment: "안녕하세요",
    userName: "dkssud",
    created: "2023-06-30",
    add: "댓글",
    show: false,
  },
  {
    id: 7,
    board: "자유 게시판",
    icon: "user-circle-o",
    title: "See you tomorrow.",
    comment: "안녕하세요",
    userName: "dkanrjsk",
    created: "2023-06-30",
    add: "댓글",
    show: true,
  },
];

const Alarm: React.FC = () => {
  // const [show, setShow] = useState<Boolean>(false);
  // const handlePress = () => {
  //   setShow(true);
  // };
  return (
    <ScrollView style={styles.container}>
      {boardData.map(board => (
        <View key={board.id}>
          <Pressable
            onPress={() => {
              console.log(board.title);
            }}
            style={board.show ? styles.showbody : styles.body}
          >
            <View style={styles.body2}>
              {/* <FontAwesome name={board.icon} size={24} color="grey" style={{ marginRight: 10 }} /> */}
              <View style={styles.content}>
                <Text style={styles.board}>{board.board}</Text>
                <View style={styles.head}>
                  <Text style={styles.title}>{board.title}</Text>
                </View>
                <View>
                  <Text style={styles.comment}>
                    {board.comment}&#9;&#40;&#9;{board.add}&#9;&#41;
                  </Text>
                </View>
                <View style={styles.head}>
                  <Text style={{ justifyContent: "flex-end", fontSize: 10 }}>{board.created}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#D8E1EC",
  },
  body: {
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
    paddingVertical: 10,
    backgroundColor: "#D8E1EC",
  },
  showbody: {
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  board: {
    fontSize: 15,
    color: "gray",
    justifyContent: "flex-start",
  },
  userName: {
    fontSize: 10,
    color: "gray",
  },
  comment: {
    fontSize: 15,
    marginVertical: 5,
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

export default Alarm;
