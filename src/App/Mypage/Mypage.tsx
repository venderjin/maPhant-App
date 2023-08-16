import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ColorValue,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { PostAPI } from "../../Api/fetchAPI";
import DeleteAPI from "../../Api/member/DeleteUser";
import { Input, Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";
import { UserData } from "../../types/User";
import Myimg from "./Myimg";

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
                  marginHorizontal: 0,
                  height: 1,
                  backgroundColor: "#aaa",
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
  const navigation = useNavigation<NavigationProps>();

  const profile = useSelector(UserStorage.userProfileSelector)! as UserData;
  const category = useSelector(UserStorage.userCategorySelector);

  const [visibleIntroModal, setVisibleIntoModal] = useState(false);
  const [introduceTxt, setIntroduceTxt] = useState("");
  let confirmedIntroTxt: string = "";

  return (
    <View style={styles.view}>
      <View style={styles.info}>
        <View style={styles.userPic}>
          <Myimg></Myimg>
        </View>
        <View style={styles.userinfoContainer}>
          <View style={styles.paddingVertical}>
            <Text style={styles.nickName}>{profile.nickname}</Text>
          </View>
          <View style={styles.paddingVertical}>
            <Text style={styles.name}>
              {profile.role} - {profile.name}
            </Text>
          </View>
          <View style={styles.paddingVertical}>
            <Text style={styles.fieldtxt}>
              {category !== null ? `${category.categoryName}` : "계열 선택안됨"}
            </Text>
            <Text style={styles.fieldtxt}>
              {category !== null ? `${category?.majorName}` : "학과 선택안됨"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.introTxtContainer}>
        <TouchableOpacity style={styles.introTxtBtn}>
          <Text
            style={styles.introTxt}
            onPress={() => {
              setVisibleIntoModal(true);
            }}
          >
            {introduceTxt !== "" ? `${introduceTxt}` : "소개글을 입력해주세요"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "skyblue" }}
          onPress={() => navigation.navigate("Profile" as any)}
        >
          <Text>남의 프로필입구</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={visibleIntroModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={() => {
                setVisibleIntoModal(false);
              }}
              hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
            >
              <AntDesign name="closecircle" size={20} color="#aaa" />
            </TouchableOpacity>
            {/* <Spacer size={5} /> */}
            <View style={{ alignItems: "center" }}>
              <Text style={styles.Moaltext}>소개글을 수정해주세요</Text>
            </View>
            <Spacer size={20} />
            <View>
              <Input
                style={styles.modalInput}
                paddingHorizontal={20}
                borderRadius={30}
                placeholder={introduceTxt !== "" ? `${introduceTxt}` : "소개글을 입력해주세요"}
                onChangeText={text => {
                  confirmedIntroTxt = text;
                }}
              ></Input>
              <Spacer size={10} />
            </View>
            <Spacer size={20} />
            <View style={styles.modalBtnDirection}>
              <TextButton
                style={styles.modalConfirmBtn}
                onPress={() => {
                  setVisibleIntoModal(false);
                  setIntroduceTxt("");
                }}
              >
                삭제
              </TextButton>
              <TextButton
                style={styles.modalConfirmBtn}
                onPress={() => {
                  setIntroduceTxt(confirmedIntroTxt);
                  setVisibleIntoModal(false);

                  // EditUser.changePhNum(phoneNumber);
                }}
              >
                수정
              </TextButton>
            </View>
            <Spacer size={5} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function MyPage() {
  const [visibleLogoutModal, setVisibleLogoutModal] = useState(false);

  const [visibleWithdrawModal, setVisibleWithdrawModal] = useState(false);
  const [visibleAuthentication, setVisibleAuthentication] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");

  const userProfle = useSelector(UserStorage.userProfileSelector);

  const checkPasswordHandler = () => {
    PostAPI("/user/changeinfo/identification", {
      password: checkPassword,
    })
      .then(res => {
        if (res.success == true) {
          setVisibleAuthentication(false);
          setVisibleWithdrawModal(true);
        }
      })
      .catch(res => {
        alert(res);
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
            navigation.navigate("PasswordCheck" as never);
          },
          href: "1",
        },
        {
          title: "로그아웃",
          onclick: () => {
            setVisibleLogoutModal(true);
          },
          href: "2",
        },
      ],
    },
    {
      title: "내 활동",
      icon: "pencil",
      color: "#5299EB",

      contents: [
        {
          title: "내가 쓴 글",
          onclick: () => {
            navigation.navigate("Mypost" as never);
          },
          href: "3",
        },
        {
          title: "내가 쓴 댓글",
          onclick: () => {
            navigation.navigate("Mycomment" as never);
          },
          href: "4",
        },
        {
          title: "좋아요 한 글",
          onclick: () => {
            navigation.navigate("Mylike" as never);
          },
          href: "5",
        },
        {
          title: "북마크",
          onclick: () => {
            navigation.navigate("Bookmark" as never);
          },
          href: "6",
        },
      ],
    },
    {
      isNoHeader: true,
      contents: [
        {
          title: "회원탈퇴",
          onclick: () => {
            //setVisibleWithdrawModal(true);
            setVisibleAuthentication(true);
          },
          href: "6",
        },
      ],
    },
  ];

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

      {/* ------------ 회원탈퇴 전 인증 모달창 */}
      <Modal animationType="fade" transparent={true} visible={visibleAuthentication}>
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
              <Text style={{ fontSize: 18 }}>비밀번호를 입력해주세요.</Text>
            </View>
            <Spacer size={20} />
            <Input
              style={{ paddingVertical: "5%", backgroundColor: "#e8eaec" }}
              paddingHorizontal={20}
              borderRadius={30}
              placeholder="Password"
              onChangeText={text => setCheckPassword(text)}
              value={checkPassword}
              secureTextEntry={true}
            ></Input>
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
                  checkPasswordHandler();
                }}
              >
                확인
              </TextButton>
              <TextButton
                style={{
                  width: "45%",
                }}
                onPress={() => {
                  setVisibleAuthentication(false);
                }}
              >
                취소
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
                  DeleteAPI.deleteUser(userProfle!.id);
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
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 30,
    marginTop: 18,
  },
  view: {
    flex: 1,
    marginTop: 18,
    backgroundColor: "#D8E1EC",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileView: {
    marginTop: 18,
    backgroundColor: "#D8E1EC",
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
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
  },
  fieldtxt: {
    fontSize: 16,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userPic: {
    flex: 0.4,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  userinfoContainer: {
    flex: 0.6,
  },
  paddingVertical: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "flex-end",
    // backgroundColor: "skyblue",
  },
  introTxtContainer: {
    marginTop: 10,
    borderTopColor: "#aaa",
    borderTopWidth: 1,
    flexDirection: "row",
  },
  introTxtBtn: {
    flex: 1,
    padding: 10,
  },
  introTxt: {
    fontSize: 15,
  },
  modalInput: {
    width: "100%",
    paddingVertical: "5%",
    backgroundColor: "#D8E1EC",
  },
  modalBackground: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 0.8,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  modifyingBtn: {
    width: "25%",
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  modalConfirmBtn: {
    width: "45%",
  },
  modalBtnDirection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Moaltext: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
