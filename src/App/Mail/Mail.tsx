import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import dayjs, { Dayjs } from "dayjs";
import duration, { Duration } from "dayjs/plugin/duration";
import { useNavigation } from "@react-navigation/native";

const mailData = [
  {
    id: 1,
    sender_id_nick: "A",
    content: "헤헤",
    is_read: true,
    sendDate: "어제",
  },
  {
    id: 2,
    sender_id_nick: "B",
    content: "네",
    is_read: true,
    sendDate: "어제",
  },
  {
    id: 3,
    sender_id_nick: "C",
    content: "ㄹㅇㅁㄴ",
    is_read: true,
    sendDate: "어제",
  },
  {
    id: 4,
    sender_id_nick: "C",
    content: "ㅁㅁ",
    is_read: true,
    sendDate: "어제",
  },
  {
    id: 5,
    sender_id_nick: "D",
    content: "ㅂㅈㄷㅂㅈㄷ",
    is_read: false,
    sendDate: "어제",
  },
  {
    id: 6,
    sender_id_nick: "E",
    content: "ㅠㅠ",
    is_read: false,
    sendDate: "어제",
  },
  {
    id: 7,
    sender_id_nick: "F",
    content: "ㅋㅋ",
    is_read: true,
    sendDate: "어제",
  },
  {
    id: 8,
    sender_id_nick: "G",
    content: "ㅎㅎ",
    is_read: false,
    sendDate: "어제",
  },
  {
    id: 9,
    sender_id_nick: "H",
    content: "fdㅠㅠs",
    is_read: false,
    sendDate: "어제",
  },
  {
    id: 10,
    sender_id_nick: "G",
    content: "gk",
    is_read: false,
    sendDate: "어제",
  },
];
//is_read : 안 읽었을때 1 = true 읽었을 때 0 = false

// sendDate 가 들어왔을 때 분전 , 시간 전으로 바꾸는 코드
// export function gettimeDiff(timeToCompare: Dayjs): string {
//   const timeDiffDuration: Duration = dayjs.duration(dayjs().diff(timeToCompare));
//   const yearDiff: number = parseInt(timeDiffDuration.format("Y"));
//   const monthDiff: number = parseInt(timeDiffDuration.format("M"));
//   const dateDiff: number = parseInt(timeDiffDuration.format("D"));
//   const hourDiff: number = parseInt(timeDiffDuration.format("H"));
//   const minuteDiff: number = parseInt(timeDiffDuration.format("m"));
//   const secondDiff: number = parseInt(timeDiffDuration.format("s"));

//   if (yearDiff > 0) {
//     return `${yearDiff} 년 전`;
//   } else if (monthDiff > 0) {
//     return `${monthDiff} 달 전`;
//   } else if (dateDiff > 0) {
//     return `${dateDiff} 일 전`;
//   } else if (hourDiff > 0) {
//     return `${hourDiff} 시간 전`;
//   } else if (minuteDiff > 0) {
//     return `${minuteDiff} 분 전`;
//   } else if (secondDiff > 0) {
//     return `${secondDiff} 초 전`;
//   } else {
//     return "";
//   }
// }

const Mail: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.mailText}>쪽지함</Text>
      </View>
      <ScrollView>
        <View style={styles.sender}>
          <View>
            {mailData.map(mail => (
              <TouchableOpacity onPress={() => navigation.navigate("Chatroom" as never)}>
                <View
                  key={mail.id}
                  style={[styles.mail, mail.is_read ? styles.mail_true : styles.mail]}
                >
                  <View style={styles.space}>
                    <Text style={styles.nick}>{mail.sender_id_nick}</Text>
                    <Text style={styles.date}>{mail.sendDate}</Text>
                  </View>
                  <Text style={styles.content}>{mail.content}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// 2023-07-10T04:39:44.555Z

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: "5%",
    // backgroundColor: "yellow",
  },
  header: {
    flexDirection: "row",
    marginTop: "15%",
    marginLeft: "8%",
    marginBottom: "3%",
    // borderBottomColor: "blue",
  },
  mailText: {
    fontSize: 30,
    fontWeight: "600",
  },

  sender: {
    backgroundColor: "white",
    // marginLeft: "5%",
    border: "2px",
  },
  mail: {
    // backgroundColor: "yellow",
    padding: "3%",
  },
  mail_true: {
    backgroundColor: "#E6E6E6",
  },
  nick: {
    fontSize: 22,
    fontWeight: "700",
  },
  content: {
    marginLeft: "7%",
    paddingTop: "2%",
    fontSize: 18,
  },
  space: {
    marginLeft: "5%",
    marginRight: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  date: {
    alignContent: "space-between",
  },
  icon: {
    // backgroundColor: "transparent",
    color: "black",
    position: "absolute",
    right: "10%",
    bottom: "5%",
    backgroundColor: "#5299EB",
    borderRadius: 50,
    padding: 10,
  },
});
export default Mail;
