import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ColorValue, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { UserData } from "../../Api/memberAPI";
import UserStorage from "../../storage/UserStorage";

type sectionItem = {
  title?: string;
  icon?: string;
  color?: ColorValue;
  isNoHeader?: boolean;

  contents: {
    title: string;
    // description: string;
    href: string;
    onclick?: () => void;
  }[];
};

const sections: sectionItem[] = [
  {
    title: "계정 설정",
    icon: "user",
    color: "#5299EB",

    contents: [
      {
        title: "회원정보 수정",
        // description: "다른 기기를 추가하거나 삭제합니다.",
        href: "1",
      },
      {
        title: "로그아웃",
        // description: "장치를 로그아웃하여 새 계정으로 전환합니다.",
        onclick: () => {
          UserStorage.removeUserData();
        },
        href: "2",
      },
    ],
  },
  {
    title: "게시판 설정",
    icon: "pencil",
    color: "#5299EB",

    contents: [
      {
        title: "내가 쓴 글",
        // description: "알람을 받지 않을 시간을 설정합니다.",
        href: "3",
      },
      {
        title: "내가 쓴 댓글",
        // description: "알림음을 설정합니다.",
        href: "4",
      },
    ],
  },
  {
    isNoHeader: true,
    contents: [
      {
        title: "회원탈퇴",
        // description: "공지사항 및 새소식을 확인합니다.",
        href: "5",
      },
    ],
  },
];

function Section({ item }: { item: sectionItem }) {
  const last_idx = item.contents.length - 1;
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.view}>
      {!item.isNoHeader && (
        <View
          style={{
            paddingHorizontal: 8,
            paddingTop: 16,
            paddingBottom: 15,
          }}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <FontAwesome
              name={item.icon as any}
              size={18}
              style={{ marginTop: 3 }}
              color={item.color || "black"}
            />
            <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
          </View>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 10,
        }}
      >
        {item.contents.map((content, index) => (
          <View>
            <Pressable key={content.href} onPress={content.onclick}>
              <View
                style={{
                  alignContent: "space-between",
                  alignItems: "stretch",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 6,
                }}
              >
                <View>
                  <Text style={styles.text}>{content.title}</Text>
                  {/* <Text
                    style={{
                      fontSize: 13,
                      letterSpacing: 0.2,
                      color: "#aaa",
                      marginTop: 8,
                    }}
                  >
                    {content.description}
                  </Text> */}
                </View>
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome name="angle-right" size={16} color="#aaa" />
                </View>
              </View>
            </Pressable>
            {index !== last_idx && (
              <View
                style={{
                  marginHorizontal: 4,
                  height: 1,
                  backgroundColor: "#f9f9f9",
                  marginVertical: 10,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const MyView = () => {
  const profile = useSelector(UserStorage.userProfileSelector)! as UserData;

  return (
    <View style={styles.view}>
      <Text style={styles.nickName}>{profile.nickname}</Text>
      <View style={styles.info}>
        <Text>{profile.name} / </Text>
        <Text>{profile.role} - </Text>
        <Text>{profile.majorId}</Text>
      </View>
    </View>
  );
};

export default function () {
  return (
    <ScrollView style={styles.container}>
      <MyView />
      {sections.map((section, index) => (
        <Section key={index.toString()} item={section} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    marginTop: 18,
  },
  view: {
    marginTop: 18,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.2,
    fontWeight: "bold",
  },
  nickName: {
    fontSize: 20,
    letterSpacing: 0.2,
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
  },
});
