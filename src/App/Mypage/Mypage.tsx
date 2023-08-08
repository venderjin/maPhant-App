import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ColorValue, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { DeleteAPI } from "../../Api/fetchAPI";
import { Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";
import { UserData } from "../../types/User";

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

function Section({ item }: { item: sectionItem }) {
  const last_idx = item.contents.length - 1;

  return (
    <View style={styles.profileView}>
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <View key={index}>
            <Pressable onPress={content.onclick}>
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
  const category = useSelector(UserStorage.userCategorySelector);

  return (
    <View style={styles.view}>
      <View style={styles.info}>
        <View>
          <Text>프로필사진</Text>
        </View>
        <View>
          <Text style={styles.nickName}>{profile.nickname}</Text>
          <View
            style={{
              justifyContent: "flex-end",
              backgroundColor: "skyblue",
            }}
          >
            <Text>{profile.name} / </Text>
            <Text>{profile.role} - </Text>
            <Text>
              {category !== null
                ? `${category.categoryName} (${category?.majorName})`
                : "학과·계열 선택안됨"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function MyPage() {
  const [visibleLogoutModal, setVisibleLogoutModal] = useState(false);
  const [visibleWithdrawModal, setVisibleWithdrawModal] = useState(false);

  const userProfle = useSelector(UserStorage.userProfileSelector);

  const deleteUser = () => {
    DeleteAPI("/user?userId=" + userProfle?.id).then(res => {
      console.log(res.success);
    });
  };

  const sections: sectionItem[] = [
    {
      title: "계정 설정",
      icon: "user",
      color: "#5299EB",

      contents: [
        {
          title: "회원정보 수정",
          onclick: () => {
            // navigation.navigate("PasswordCheck");
            navigation.navigate("ProfileModify");
          },
          // description: "다른 기기를 추가하거나 삭제합니다.",
          href: "1",
        },
        {
          title: "로그아웃",
          // description: "장치를 로그아웃하여 새 계정으로 전환합니다.",
          onclick: () => {
            setVisibleLogoutModal(true);
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
          onclick: () => {
            deleteUser();
            UserStorage.removeUserData();
          },
          href: "5",
        },
      ],
    },
  ];
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScrollView style={styles.container}>
      {/* ------------ 로그아웃 모달창 */}
      <Modal animationType="fade" transparent={true} visible={visibleLogoutModal}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            // backgroundColor: "skyblue",
          }}
        >
          <View
            style={{
              flex: 0.6,
              borderRadius: 25,
              backgroundColor: "#ffffff",
              padding: 25,
            }}
          >
            <Spacer size={5} />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>로그아웃 하시겠습니까?</Text>
            </View>
            <Spacer size={20} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TextButton
                style={{
                  width: "45%",
                }}
                onPress={() => {
                  UserStorage.removeUserData();
                }}
              >
                예
              </TextButton>
              <TextButton
                style={{
                  width: "45%",
                }}
                onPress={() => {
                  setVisibleLogoutModal(false);
                }}
              >
                아니오
              </TextButton>
            </View>
            <Spacer size={5} />
          </View>
        </View>
      </Modal>

      {/* ------------ 회원탈퇴 모달창 */}
      <Modal animationType="fade" transparent={true} visible={visibleWithdrawModal}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            // backgroundColor: "skyblue",
          }}
        >
          <View
            style={{
              flex: 0.6,
              borderRadius: 25,
              backgroundColor: "#ffffff",
              padding: 25,
            }}
          >
            <Spacer size={5} />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>회원탈퇴 하시겠습니까?</Text>
            </View>
            <Spacer size={20} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TextButton
                style={{
                  width: "45%",
                }}
                onPress={() => {
                  // 회원탈퇴 API 넣기
                }}
              >
                예
              </TextButton>
              <TextButton
                style={{
                  width: "45%",
                }}
                onPress={() => {
                  setVisibleWithdrawModal(false);
                }}
              >
                아니오
              </TextButton>
            </View>
            <Spacer size={5} />
          </View>
        </View>
      </Modal>

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
  profileView: {
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
    width: "100%",
    height: "40%",
    flexDirection: "column",
    backgroundColor: "orange",
  },
});
