import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Text, Platform } from "react-native";
import { ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { chartLists, sendContent } from "../../Api/member/FindUser";
import { Container, ImageBox, Input, TextButton } from "../../components/common";
import { MailFormParams } from "../../Navigator/MailRoute";
import { NavigationProps } from "../../Navigator/Routes";
import { ReceiveList } from "../../types/DM";
const Chatroom: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const scrollViewRef = useRef<ScrollView>(null);

  const windowWidth = useWindowDimensions().width; // window 가로 길이s
  // SearchUser.tsx에서 입력한 유저의 id, nickname을 가져오기 위해 사용한 것
  const route = useRoute();
  const params = route.params as MailFormParams;
  const [receiveContent, setReceiveContent] = useState<ReceiveList[]>([]);
  const [content, setContent] = useState("");
  const scrollToBottom = () => {
    //스크롤
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  const send = async () => {
    // 전송 버튼 눌렸을때 실행되는 함수
    sendContent(params.id, content) //postApi 로 id ,content 보냄
      .then(res => {
        //성공하면 return 시켜라
        if (res.success) {
          fetchChatLists(params.roomId);
          scrollToBottom();
        }
        console.log("send성공", res.data);
      })
      .catch(e => console.error("send에러", e));
    setContent("");
  };

  const fetchChatLists = async (roomId: number) => {
    //대화내용 받아오는거 같음
    chartLists(roomId) //그 대화내용의 방 id
      .then(res => {
        if (res.success) {
          setReceiveContent(res.data?.list);
          console.log("fetchChatLists 받아옴");
        }
      })
      .catch(e => console.error("fetchChatLists에러", e));
  };

  useEffect(() => {
    if (params.roomId) {
      fetchChatLists(params.roomId);
    }
  }, [params.roomId]);
  console.log("징징");

  function getCurrentTime(targetDate: Date) {
    //시간
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();
    // 00 : 00 분으로 표시되게 바꿈
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const currentTime = `${formattedHours}:${formattedMinutes}`;
    return currentTime;
  }

  function OtherUserChat({ message }: { message: ReceiveList }) {
    return (
      <Container style={{ paddingVertical: 0 }}>
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
      </Container>
    );
  }
  function UserChat({ message }: { message: ReceiveList }) {
    return (
      <Container style={{ paddingVertical: 0 }}>
        <Container key={message.id} style={{ padding: 10, alignItems: "flex-end" }}>
          <Text>ME</Text>
          <Container style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={{ marginRight: 5 }}>{getCurrentTime(new Date(message.time))}</Text>
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
      </Container>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <Container isFullScreen={true} style={{ flex: 1, display: "flex" }}>
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
            {receiveContent.map(message =>
              message.time && message.is_me ? (
                <UserChat key={message.id} message={message} />
              ) : (
                <OtherUserChat key={message.id} message={message} />
              ),
            )}
          </ScrollView>
        </Container>
        <Container // 채팅입력창
          paddingHorizontal={0}
          style={{
            flex: 2, // 네비게이션 바 없어지면 1로 바꾸기
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
    </KeyboardAvoidingView>
  );
};

export default Chatroom;
