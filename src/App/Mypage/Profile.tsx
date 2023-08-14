import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, Modal, StyleSheet, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

import { Container, ImageBox, Input, TextButton } from "../../components/common";
import { useNavigation } from "@react-navigation/native";

const Profile: React.FC = () => {
  //   const navigation = useNavigation<NavigationProps>();

  function OtherProfile() {
    return (
      <Container style={styles.Container}>
        <Container style={{ alignItems: "center" }}>
          <ImageBox
            source={require("../../../assets/image3.png")}
            width={100}
            height={100}
            borderRadius={100}
          />
        </Container>
        <Container style={{ alignItems: "center", marginVertical: 5 }}>
          <Container>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>UserNickName</Text>
          </Container>
          <Container>
            <Text style={{ color: "gray" }}>User department</Text>
          </Container>
          <Container>
            <Text>안녕하세요 여기는 소개글 자리입니다.!</Text>
          </Container>
        </Container>
      </Container>
    );
  }
  function SendMail() {
    return (
      <Container
        style={{
          backgroundColor: "rgba(82, 153, 235, 0.8)",
          alignItems: "center",
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>쪽지 보내기 </Text>
        <FontAwesome name="message-square" size={24} color="black" />
      </Container>
    );
  }
  function Otherfunction() {
    return (
      <Container style={styles.Container}>
        <Container style={{ padding: 20 }}>
          <Container style={{ flexDirection: "row" }}>
            <FontAwesome name="user" color="#5299EB" size={18} />
            <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>계정 기능</Text>
          </Container>
          <Container>
            {["작성한 게시글 목록", "작성한 댓글 목록", "좋아요한 글 목록"].map(
              (item, index, array) => (
                <>
                  <TouchableOpacity
                    key={index}
                    onPress={() => alert(item)}
                    style={{
                      padding: 10,
                      paddingVertical: 18,
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
    <SafeAreaView style={{ display: "flex", padding: 20 }}>
      <OtherProfile />
      <SendMail />
      <Otherfunction />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "rgba(82, 153, 235, 0.3)",
    borderRadius: 8,
    marginTop: 20,
  },
});
export default Profile;
