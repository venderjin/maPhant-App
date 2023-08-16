import { useTheme } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { sendFcm } from "../../Api/member/Fcm";
import loadDefaultStyles from "../Style/styles/Alarmcss";

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
  // console.info("에러 안뜨나???");
  // console.log(messaging().getToken());
  useEffect(() => {
    const getFcmToken = async () => {
      const token = (await Notifications.getDevicePushTokenAsync()).data;
      sendFcm(token);
      console.log(token);
      return token;
    };
    getFcmToken(); // 비동기 함수 호출
  }, []);

  // const [show, setShow] = useState<Boolean>(false);
  // const handlePress = () => {
  //   setShow(true);
  // };
  const theme = useTheme();
  const styles = loadDefaultStyles(theme);

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
                  <Text style={{ ...styles.comment, color: theme.colors.text }}>
                    {board.comment}&#9;&#40;&#9;{board.add}&#9;&#41;
                  </Text>
                </View>
                <View style={styles.head}>
                  <Text
                    style={{ justifyContent: "flex-end", fontSize: 10, color: theme.colors.text }}
                  >
                    {board.created}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};
export default Alarm;
