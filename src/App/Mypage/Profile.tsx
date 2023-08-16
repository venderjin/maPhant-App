import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { receiveChatrooms } from "../../Api/member/FindUser";
import { readProfile } from "../../Api/member/Others";
import UserAPI from "../../Api/memberAPI";
import { Container, ImageBox, Input, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import { MessageList } from "../../types/DM";
import { OtherUserData, UserData } from "../../types/User";

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [profileList, setProfileList] = useState<UserData[]>([]);
  const [otherUserProfileList, setOtherUserProfileList] = useState<OtherUserData[]>([]);
  const [cmpid, setCmpId] = useState<MessageList[]>([]);
  const [id, setId] = useState(0);
  // 일단 다른 사용자 id 불러올 방법이 없어서 자신 id로 하는 중
  // 값을 받아오는데 시간이 생각보다 걸린다...
  // const route = useRoute();
  // const params = route.params as
  useEffect(() => {
    UserAPI.getProfile()
      .then(res => {
        console.log("e");
        setProfileList(res.data);
      })
      .catch(e => alert(e));
  }, []);

  // 불러온 id로 상대방 프로필, 소개글, 닉네임을 받아옴
  useEffect(() => {
    setId(profileList.id);
    console.log(id);
    readProfile(id)
      .then(res => {
        setOtherUserProfileList(res.data);
        console.log(res.data);
      })
      .catch(e => console.log(e));
    receiveChatrooms()
      .then(res => {
        console.log(res);
        setCmpId(res.data);
      })
      .catch(e => console.log(e));
  }, []);
  console.info(otherUserProfileList);
  console.log(cmpid);
  cmpid.map(item => item.other_id == 128) ? console.info("성공") : console.info("실패");
  const chat = () => {
    const roomIds = cmpid.filter(item => item.other_id == 152);
    const roomId = roomIds.length == 0 ? 0 : roomIds[0].id;
    // 여기 상대방 닉네임이랑, 그 상대방의 id를 같이 넘겨줘야함. id는 board에서 상대 닉네임 클릭시 id랑 같이 넘겨 받아야함. MypageRoute에 추가해줘서 넘어감 이게 맞는 방법인지 잘모르겠음
    navigation.navigate("Chatroom", {
      id: 152,
      nickname: "한국인",
      roomId: roomId,
    } as never);
  };
  const changePage = (item: string) => {
    if (item.toString() == "작성한 게시글 목록") {
      console.log(item);
      // 페이지 이동
      navigation.navigate("WriteBoard", { id: profileList.id } as never);
    }
    if (item.toString() == "작성한 댓글 목록") {
      console.log(item);
      // 페이지 이동
      navigation.navigate("WriteContent" as never);
    }
    if (item.toString() == "좋아요한 글 목록") {
      console.log(item);
      // 페이지 이동
      navigation.navigate("LikeContent" as never);
    }
  };
  function OtherProfile() {
    return (
      <Container
        style={{
          flex: 2,
          backgroundColor: "rgba(82, 153, 235, 0.3)",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 1,
        }}
      >
        <Container style={{ flex: 2, justifyContent: "flex-end" }}>
          <ImageBox
            // 이 부분은 받아온 이미지를 어떻게 불러오는지 몰라서 그대로 나둠
            source={require("../../../assets/image3.png")}
            width={110}
            height={110}
            borderRadius={100}
            style={{ borderColor: "#5299EB", borderWidth: 3, borderRadius: 100 }}
          />
        </Container>
        <Container style={{ alignItems: "center", flex: 1 }}>
          <Container>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{profileList.nickname}</Text>
          </Container>
          <Container>
            <Text style={{ color: "gray" }}>User department</Text>
          </Container>
          <Container style={{}}>
            {
              // 소개글 유무로 내용을 정함
              profileList.body ? (
                <Text>{profileList.body}</Text>
              ) : (
                <Text>안녕하세요 여기는 소개글 자리입니다! </Text>
              )
            }
          </Container>
        </Container>
        <Container style={{ flex: 1 }}>
          <TextButton
            onPress={() => {
              alert("메롱");
              chat();
            }}
          >
            1:1채팅
          </TextButton>
        </Container>
      </Container>
    );
  }

  function Otherfunction() {
    return (
      <Container
        style={{
          backgroundColor: "rgba(82, 153, 235, 0.3)",
          borderRadius: 8,
          marginTop: 10,
          flex: 1,
        }}
      >
        <Container style={{ padding: 20 }}>
          <Container style={{ flexDirection: "row" }}>
            <FontAwesome name="user" color="#5299EB" size={18} />
            <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>계정 기능</Text>
          </Container>
          <Container style={{}}>
            {["작성한 게시글 목록", "작성한 댓글 목록", "좋아요한 글 목록"].map(
              (item, index, array) => (
                <>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      alert(item);
                      changePage(item);
                    }}
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Container>
                      <Text style={{ fontWeight: "600" }}>{item}</Text>
                    </Container>
                    <Container>
                      <FontAwesome name="angle-right" color="#5299EB" />
                    </Container>
                  </TouchableOpacity>
                  {index !== array.length - 1 && (
                    <View style={{ width: "100%", height: 1, backgroundColor: "#5299EB" }} />
                  )}
                </>
              ),
            )}
          </Container>
        </Container>
      </Container>
    );
  }
  return (
    <SafeAreaView style={{ display: "flex", flex: 1, padding: 20 }}>
      <OtherProfile />
      <Otherfunction />
    </SafeAreaView>
  );
};

export default Profile;
