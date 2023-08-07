import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { receiveContent } from "../../Api/member/FindUser";
import { Container, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import { MessageList } from "../../types/DM";

const Mail: React.FC = () => {
  //is_read : 안 읽었을때 1 = true 읽었을 때 0 = false
  // sendDate 가 들어왔을 때 분전 , 시간 전으로 바꾸는 코드
  function formatTimeDifference(targetDate: Date): string {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (seconds < 60) {
      return `${seconds}초 전`;
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 30) {
      return `${days}일 전`;
    } else {
      return `${months}개월 전`;
    }
  }
  const [chatList, setChatList] = useState<MessageList[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const searchUser = () => {
    navigation.navigate("SearchUser" as never);
  };
  useEffect(() => {
    receiveContent()
      .then(res => {
        // 리스트에 대화방 정보 담음
        setChatList(res.data);
      })
      .catch(e => console.info(e));
  }, []);
  return (
    <Container style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.mailText}>쪽지함</Text>
      </View>
      <ScrollView>
        <View style={styles.sender}>
          <View>
            {chatList.map(mail => (
              // eslint-disable-next-line react/jsx-key
              <TouchableOpacity
                key={mail.id}
                onPress={() => {
                  // 채티방 페이지로 상대방 아이디랑, 닉네임 같이 넘김
                  navigation.navigate("Chatroom", {
                    id: mail.other_id,
                    nickname: mail.other_nickname,
                  });
                }}
              >
                <View style={[styles.mail, mail.unread_count ? styles.mail_true : styles.mail]}>
                  <View style={styles.space}>
                    <Text style={styles.nick}>{mail.other_nickname}</Text>
                    <Text style={{ alignContent: "space-between" }}>
                      {formatTimeDifference(new Date(mail.time))}
                    </Text>
                  </View>
                  <Text style={styles.content}>{mail.last_content}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <Container
        style={{
          backgroundColor: "#e9ecef",
          borderRadius: 100,
          position: "absolute",
          right: "10%",
          bottom: "5%",
        }}
      >
        <TextButton
          style={{ flex: 1, backgroundColor: "#e9ecef" }}
          paddingVertical={10}
          onPress={searchUser}
        >
          <Entypo name="plus" size={24} color="black" />
        </TextButton>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
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
