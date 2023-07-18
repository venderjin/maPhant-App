import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

const BoardList = () => {
  const navigation = useNavigation();
  const changePage = () => {
    navigation.navigate("List" as never);
  };
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.textFont}>SoftWare</Text>
          <Text style={styles.textFont}>Bell</Text>
        </View> */}
        <View style={styles.topic}>
          <View style={styles.topicInner}>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              오늘의 열띈 주제는?
            </Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnFont}>투표하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        ></View>
        <View style={styles.search}>
          <TextInput placeholder="게시판 검색..." style={styles.searchbar}></TextInput>
          <AntDesign name="search1" size={24} color="#666666" />
        </View>
        <View style={styles.board}>
          {/* <Text>중앙정렬</Text> */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TotalBoard" as never);
              }}
            >
              <View style={styles.boardList}>
                <Feather name="message-square" size={24} color="black" />
                <Text>전체 게시판</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={changePage}>
              <View style={styles.boardList}>
                <Feather name="message-square" size={24} color="black" />
                <Text>지식 게시판</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("QnABoard" as never);
              }}
            >
              <View style={styles.boardList}>
                <Feather name="message-square" size={24} color="black" />
                <Text>QnA 게시판</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={changePage}>
              <View style={styles.boardList}>
                <Feather name="message-square" size={24} color="black" />
                <Text>취업 / 진로</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={changePage}>
              <View style={styles.boardList}>
                <Feather name="message-square" size={24} color="black" />
                <Text>홍보 게시판</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={changePage}>
              <View style={styles.boardList}>
                <Feather name="message-square" size={24} color="black" />
                <Text>취미 게시판</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.hotStudy}>
          <View>
            <TouchableOpacity onPress={changePage} style={{ marginBottom: 30 }}>
              <Text>
                HOT 게시글 <MaterialCommunityIcons name="fire" size={24} color="black" />{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={changePage}>
            <Text>
              스터디 <Entypo name="open-book" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 30,
  },
  btnFont: {
    color: "white",
  },
  header: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textFont: {
    fontSize: 18,
  },
  topic: {
    flex: 3,
    backgroundColor: "#D8E1EC",
    margin: 20,
  },
  topicInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: "red",
  },
  // fontW: {
  //   fontWeight:"blod",
  // },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D8E1EC",
    margin: 20,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchbar: {},
  board: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#D0D0D0",
    borderBottomColor: "#D0D0D0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  boardList: {
    // flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D8E1EC",
    margin: 20,
    padding: 10,
  },
  hotStudy: {
    flex: 2,
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D8E1EC",
    margin: 20,
    paddingLeft: 15,
  },
});
export default BoardList;
