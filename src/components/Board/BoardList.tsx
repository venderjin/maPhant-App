import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
// const head = ({ navigation, route }: any) => {
//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => {
//         <MaterialCommunityIcons
//           name='home-variant' />
//       },
//     });
//   }, []);
// };
const BoardList = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.textFont}>SoftWare</Text>
        <Text style={styles.textFont}>Bell</Text>
      </View> */}
      <View style={styles.topic}>
        <View style={styles.topicInner}>
          <Text> 오늘의 열띈 주제는? </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnFont}>투표하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1 }}></View>
      <View style={styles.search}>
        <TextInput
          placeholder="게시판 검색..."
          style={styles.searchbar}
        ></TextInput>
        <AntDesign name="search1" size={24} color="black" />
      </View>
      <View style={styles.board}>
        {/* <Text>중앙정렬</Text> */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.boardList}>
            <Feather name="message-square" size={24} color="black" />
            <Text>전체 게시판</Text>
          </View>
          <View style={styles.boardList}>
            <Feather name="message-square" size={24} color="black" />
            <Text>지식 게시판</Text>
          </View>
          <View style={styles.boardList}>
            <Feather name="message-square" size={24} color="black" />
            <Text>QnA 게시판</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.boardList}>
            <Feather name="message-square" size={24} color="black" />
            <Text>취업 / 진로</Text>
          </View>
          <View style={styles.boardList}>
            <Feather name="message-square" size={24} color="black" />
            <Text>홍보 게시판</Text>
          </View>
          <View style={styles.boardList}>
            <Feather name="message-square" size={24} color="black" />
            <Text>취미 게시판</Text>
          </View>
        </View>
      </View>
      <View style={styles.hotStudy}>
        <View>
          <TouchableOpacity style={{ marginBottom: 30 }}>
            <Text>
              HOT 게시글{" "}
              <MaterialCommunityIcons name="fire" size={24} color="black" />{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text>
            스터디 <Entypo name="open-book" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "#f2f2f2",
    margin: 20,
  },
  topicInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  // fontW: {
  //   fontWeight:"blod",
  // },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    margin: 20,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchbar: {},
  board: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    // borderTopColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  boardList: {
    // flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    margin: 20,
    padding: 10,
  },
  hotStudy: {
    flex: 2,
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    margin: 20,
    paddingLeft: 15,
  },
});
export default BoardList;
