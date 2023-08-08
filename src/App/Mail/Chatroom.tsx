import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { chartLists, sendContent } from "../../Api/member/FindUser";
import { Container, ImageBox, Input, TextButton } from "../../components/common";
import { MailFormParams } from "../../Navigator/MailRoute";
import { NavigationProps } from "../../Navigator/Routes";
import reduxStore, { ChatSlice, RootState } from "../../storage/reduxStore";
import { ReceiveList } from "../../types/DM";
const Chatroom: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const windowWidth = useWindowDimensions().width; // window 가로 길이
  // SearchUser.tsx에서 입력한 유저의 id, nickname을 가져오기 위해 사용한 것
  const route = useRoute();
  const params = route.params as MailFormParams;

  const [messageList, setMessageList] = useState<
    { id: number; sender: string; date: string; content: string }[]
  >([]);
  const [content, setContent] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const Chatdata = useSelector((state: RootState) => state.ChatSlice);
  const Chatroom: string[] = Chatdata[1] ? Chatdata[1] : [];
  // 상대방이 보낸 내용 담는 배열
  const [receiveContent, setReceiveContent] = useState<ReceiveList[]>([]);

  const send = () => {
    reduxStore.dispatch(ChatSlice.actions.addChat({ chatid: 1, content: content }));
    sendContent(params.id, content)
      .then(res => {
        if (res.data) {
          const currentTime = res.data.time;
          const newMessage = {
            id: params.id,
            sender: "ME",
            date: currentTime,
            content: content,
          };
          setMessageList(prevMessageList => [...prevMessageList, newMessage]);
        }
      })
      .catch(e => console.info(e));
    setContent("");
  };

  useEffect(() => {
    // 대화방 처음 만들 때는 바로 채팅방 id를 확인 할수 없어서 방에 들어와서 찾아주는 거임

    // if (params.roomId === 0) {
    //   receiveChatrooms().then(res => {
    //     if (res.success) setChatroomId(res.data);
    //   });
    // }
    // console.info(chatroomId);
    // chatroomId[0].id 이렇게 값을 못찾는다...

    //상대방이 보낸 대화내용 불러옴
    chartLists(params.roomId)
      .then(res => {
        if (res.success) {
          setReceiveContent(res.data?.list);
        }
      })
      .catch(e => console.error(e));
    scrollToBottom();
  }, [messageList]);

  function getCurrentTime(targetDate: Date) {
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();
    // 00 : 00 분으로 표시되게 바꿈
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const currentTime = `${formattedHours}:${formattedMinutes}`;
    return currentTime;
  }
  function OtherUserChat() {
    return (
      <Container style={{ paddingVertical: 0 }}>
        {receiveContent.map(
          message =>
            !message.is_me && (
              <Container key={message.id} style={{ padding: 10 }}>
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
                    <Text>{message.content}</Text>
                  </Container>
                  <Text style={{ marginLeft: 5 }}>{getCurrentTime(new Date(message.time))}</Text>
                </Container>
              </Container>
            ),
        )}
      </Container>
    );
  }
  function UserChat(props: { messageList: { date: string; content: string }[] }) {
    const { messageList } = props;
    return (
      <Container style={{ paddingVertical: 0 }}>
        {messageList.map((message, i) => (
          <Container key={i} style={{ padding: 10, alignItems: "flex-end" }}>
            <Text>Me</Text>
            <Container style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ marginRight: 5 }}>{getCurrentTime(new Date(message.date))}</Text>
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
          flex: 0.7,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          flexShrink: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.popToTop())}>
          <ImageBox source={require("../../../assets/arrow-circle.png")} width={35}></ImageBox>
        </TouchableOpacity>
        <Text style={{ fontSize: 23, fontWeight: "bold", marginRight: windowWidth / 2 - 66 }}>
          채팅방이름
        </Text>
      </Container>
      <Container style={{ flex: 10 }}>
        <ScrollView ref={scrollViewRef}>
          {Chatroom.map((content, id) => (
            // <Text>{content}</Text>
            <UserChat key={id} messageList={[{ date: "someDate", content: content }]} />
          ))}
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
