import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const data = [
  {
    id: 1,
    name: "jingjing",
    date: "12312.312.412.3",
  },
  {
    id: 2,
    name: "ahdjfad",
    date: "2024.232.",
  },
  { id: 3, name: "지망이", date: " 2023.03,12" },
];

const QA = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameBox}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.headername}>Q&A게시판</Text>
          <TouchableOpacity style={{ marginTop: 5, marginRight: 10 }}>
            <Icon name="bell-o" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.departname}>software</Text>
        </View>
      </View>
      <View style={styles.qainfoBox}>
        <View>
          <View style={styles.qaheader}>
            <View style={styles.qauserBox}>
              <View>
                <Text style={styles.nickname}>jingjing</Text>
              </View>
              <View>
                <Text style={styles.date}>2023.04.13</Text>
              </View>
            </View>
            <View style={styles.qaButtonBox}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btext}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btext}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.qacontextBox}>
            <View>
              <Text style={styles.qatitle}>안녕하세요 인사드립낟,</Text>
            </View>
            <View>
              <Text style={styles.qacontext}>라고할뻔~</Text>
            </View>
          </View>
        </View>

        <View style={styles.cbutBox}>
          <TouchableOpacity style={styles.commonbutton}>
            <Icon name="thumbs-o-up" color="skyblue" />
            <Text style={styles.btext}>추천</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commonbutton}>
            <Icon name="star-o" color="yellow" />
            <Text style={styles.btext}>스크랩</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commonbutton}>
            <Icon name="exclamation-circle" color="red" />
            <Text style={styles.btext}>신고</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commonbutton}>
            <Icon name="comment-o" color="purple" />
            <Text style={styles.btext}>답변</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        {data.map((answer) => (
          <View style={styles.answerBox} key={answer.id}>
            <View style={styles.line} />
            <View style={{ margin: "3%" }}>
              <View style={styles.answerheader}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.answername}>{answer.name}</Text>
                  <Text style={styles.answerdate}>{answer.date}</Text>
                </View>
                <View style={styles.cbutBox}>
                  <TouchableOpacity style={styles.commonbutton}>
                    <Icon name="lightbulb-o" color="purple" />
                    <Text style={styles.btext}>해결</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.commonbutton}>
                    <Icon name="thumbs-o-up" color="skyblue" />
                    <Text style={styles.btext}>추천</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.commonbutton}>
                    <Icon name="exclamation-circle" color="red" />
                    <Text style={styles.btext}>신고</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.touchdetail}>
                <View style={styles.answercontext}>
                  <Text style={styles.qatitle}>제목</Text>
                  <Text numberOfLines={3} style={styles.qacontext}>
                    내용dfadsfadsdfasdfasdfasdfefhidfhiwhjhuuadjfabdsjfuehjvjabdsuvheujadbvjbadsjvbjdsbhbah
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flex: 1,
  },
  nameBox: {
    flex: 1,
    padding: "3%",
    justifyContent: "space-between",
  },
  headername: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 4,
  },
  qainfoBox: {
    justifyContent: "space-between",
    flex: 5,
    padding: "4%",
  },
  qaheader: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  qaButtonBox: {
    flexDirection: "row",
  },
  nickname: {
    fontSize: 20,
  },
  date: {
    marginLeft: 5,
    fontSize: 10,
    color: "gray",
  },
  qacontextBox: {
    margin: "5%",
  },
  qatitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  qacontext: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 17,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 15,
    margin: 5,
    backgroundColor: "#f2f2f2",
  },

  cbutBox: {
    flexDirection: "row",
  },
  commonbutton: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 11,
    marginHorizontal: 5,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
  },

  btext: {
    marginLeft: 5,
    fontSize: 9,
  },
  answerBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#f2f2f2",
  },
  answerheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answername: {
    fontSize: 15,
    marginRight: 5,
  },
  answerdate: {
    marginTop: 5,
    fontSize: 11,
    color: "lightgray",
  },
  answercontext: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  // touchdetail: {
  //   margin: "3%",
  // },
  scroll: {
    height: "30%",
  },
});

export default QA;
