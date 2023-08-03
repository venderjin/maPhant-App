import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";

import { Container, ImageBox, Input, Spacer, TextButton } from "../../components/common";

const Chatroom: React.FC = () => {
  const chatData = { profile: "user", name: "User", time: "10:00 AM", content: "Hello" };
  const chatComponents = Array(100).fill(chatData);
  return (
    <Container style={{ flex: 1, display: "flex" }}>
      <Container // 채팅방 이름
        style={{
          flex: 0.8,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>채팅방이름</Text>
      </Container>
      <Container style={{ flex: 10, backgroundColor: "pink" }}>
        <ScrollView>
          {chatComponents.map((chat, index) => (
            <Text key={index} style={styles.chatText}>
              {`${chat.profile} (${chat.name}) - ${chat.time}: ${chat.content}`}
            </Text>
          ))}
        </ScrollView>
      </Container>
      <Container // 채팅입력창
        style={{
          flex: 1,
          backgroundColor: "purple",
          flexDirection: "row",
          padding: "3%",
        }}
      >
        <Container style={{ flex: 6 }}>
          <Input placeholder="message" />
        </Container>
        <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TextButton
            style={{
              marginLeft: 10,
              paddingHorizontal: 0,
              paddingVertical: 0,
              borderRadius: 300,
              width: "100%",
              height: "100%",
            }}
          >
            전송
          </TextButton>
        </Container>
      </Container>
    </Container>
  );
};
const styles = StyleSheet.create({
  chatText: {
    fontSize: 16,
    marginVertical: 8,
  },
});
export default Chatroom;
