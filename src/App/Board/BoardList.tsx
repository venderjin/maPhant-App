import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SearchBar from "../../components/Input/searchbar";
import { SafeAreaView } from "react-native-safe-area-context";

const BoardList = () => {
  const navigation = useNavigation();

  const changePage = () => {
    navigation.navigate("List" as never);
  };
  const touch = () => {
    console.log("??????");
  };
  const handle = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback onPress={handle}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.container}>
            <View style={styles.topic}>
              <View style={styles.topicInner}>
                <View>
                  <Text> 오늘의 열띈 주제는? </Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.btn} onPress={touch}>
                    <Text style={styles.btnFont}>투표하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1 }}></View>
            <SearchBar />

            <View style={styles.board}>
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
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnFont: {
    color: "white",
    paddingBottom: 15,
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
    backgroundColor: "skyblue",
    margin: 20,
  },
  topicInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    paddingBottom: 100,
  },
  board: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    // borderTopColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 35,
  },
  boardList: {
    // flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
    margin: 15,
    padding: 20,
  },
  hotStudy: {
    flex: 2,
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
    margin: 20,
    padding: 15,
  },
});
export default BoardList;
