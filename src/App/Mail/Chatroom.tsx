import { useRoute } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";

import { sendContent } from "../../Api/member/FindUser";
import { Container, ImageBox, Input, Spacer, TextButton } from "../../components/common";
import { MailFormParams } from "../../Navigator/MailRoute";
const Chatroom: React.FC = () => {
  // const chatData = { profile: "user", name: "User", time: "10:00 AM", content: "Hello" };
  // const chatComponents = Array(100).fill(chatData);

  // SearchUser.tsx에서 입력한 유저의 id, nickname을 가져오기 위해 사용한 것
  const route = useRoute();
  const params = route.params as MailFormParams;

  //
  // const messages = params.id;

  const [messageList, setMessageList] = useState<
    { id: number; sender: string; date: string; content: string }[]
  >([]);
  const [content, setContent] = useState("");

  const send = () => {
    sendContent(params.id, content)
      .then(res => {
        if (res.data) {
          const currentTime = getCurrentTime();
          const newMessage = {
            id: params.id,
            sender: "ME",
            date: currentTime,
            content: content,
          };
          setMessageList(prevMessageList => [...prevMessageList, newMessage]);
          console.log(params.id, content);
        }
      })
      // .then(json => {
      //   console.log(json);
      // })
      .catch(e => console.info(e));
    setContent("");
  };

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours}:${minutes}`;
    return currentTime;
  }

  function OtherUserChat() {
    return (
      <Container style={{ paddingVertical: 0 }}>
        <Container style={{ padding: 10 }}>
          <Text>{params.nickname}</Text>
          <Container style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Container
              style={{
                backgroundColor: "rgba(82, 153, 235, 0.3)",
                paddingVertical: 13,
                paddingHorizontal: 20,
                borderRadius: 10,
                flexShrink: 1,
              }}
            >
              <Text>안녕하세요</Text>
            </Container>
            <Text style={{ marginLeft: 5 }}>date</Text>
          </Container>
        </Container>
      </Container>
    );
  }
  function UserChat() {
    return (
      <Container style={{ paddingVertical: 0 }}>
        {messageList.map((message, i) => (
          <Container key={i} style={{ padding: 10, alignItems: "flex-end" }}>
            <Text>Me</Text>
            <Container style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ marginRight: 5 }}>{message.date}</Text>
              <Container
                style={{
                  backgroundColor: "#5299EB",
                  paddingVertical: 13,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  flexShrink: 1,
                }}
              >
                <Text style={{ color: "white" }}>{message.content}</Text>
              </Container>
            </Container>
          </Container>
        ))}
      </Container>
    );
  }
  return (
    <Container
      isFullScreen={true}
      isForceKeyboardAvoiding={true}
      style={{ flex: 1, display: "flex" }}
    >
      <Container // 채팅방 이름
        style={{
          flex: 0.8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>채팅방이름</Text>
      </Container>
      <Container style={{ flex: 10 }}>
        <ScrollView ref={scrollViewRef}>
          <UserChat />
          <OtherUserChat />
        </ScrollView>
      </Container>
      <Container // 채팅입력창
        paddingHorizontal={0}
        style={{
          flex: 1,
          flexDirection: "row",

          // paddingHorizontal: 10,
          padding: "3%",
        }}
      >
        {/* <Container style={{ flex: 6 }}> */}
        <Input
          multiline={true}
          style={{ maxHeight: 100, flexShrink: 1, flex: 6 }}
          placeholder="message"
          value={content}
          onChangeText={setContent}
        />
        {/* </Container> */}
        {/* <Container
          style={{
            backgroundColor: "pink",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
        <TextButton
          onPress={() => {
            send();
          }}
          style={{
            flex: 1,
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
        {/* </Container> */}
      </Container>
    </Container>
  );
};

export default Chatroom;
