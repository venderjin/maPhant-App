import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { PostAPI } from "../../Api/fetchAPI";
import UserAPI from "../../Api/memberAPI";
import { Container, Input, Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";

const ProfileModify: React.FC = () => {
  const profile = useSelector(UserStorage.userProfileSelector);

  type UserType = {
    email?: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    name?: string;
    phoneNumber: string;
    studentNumber?: number;
  };

  const usetModifying: UserType = {
    email: profile?.email,
    password: "",
    confirmPassword: "",
    nickname: "",
    name: profile?.name,
    phoneNumber: "",
    studentNumber: profile?.sno,
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modifyingPassWordModal, setModyfyingPassWordModal] = useState(false);
  const [modifyingNicknameModal, setModyfyingNicknameModal] = useState(false);
  const [modifyingPhoneNumModal, setModyfyingPhoneNumModal] = useState(false);

  const changePassword = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      PostAPI("/user/changeinfo/password", {
        email: profile?.email,
        newPassword: password,
        newPasswordCheck: confirmPassword,
      }).then(res => {
        if (res.success == true) {
          console.log(res.success);
        } else {
          console.log(res.errors);
        }
      });
    }
  };

  const changeNickname = () => {
    PostAPI("/user/changeinfo/nickname", {
      email: profile?.email,
      nickname: nickname,
    }).then(res => {
      if (res.success == true) {
        console.log(res.success);
      } else {
        console.log(res.errors);
      }
      UserAPI.getProfile().then(res => {
        UserStorage.setUserProfile(res.data);
      });
    });
  };

  const changePhNum = () => {
    PostAPI("/user/changeinfo/phnum", {
      email: profile?.email,
      phNum: phoneNumber,
    }).then(res => {
      if (res.success == true) {
        console.log(res.success);
      } else {
        console.log(res.errors);
        alert("번호 형식을 확인해주세요. \n ex) 010-0000-0000");
      }
    });
  };
  const navigation = useNavigation<NavigationProps>();

  return (
    <Container style={{ backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <View>
            {/* -----------이메일 */}
            <Text style={styles.text}>이메일</Text>
            <View style={styles.modifyingContainer}>
              <Text style={styles.text}>{usetModifying.email}</Text>
            </View>

            {/* --------------비밀번호 수정 */}
            <View style={styles.childRow}>
              <View style={styles.modifyingContentWidth}>
                <Text style={styles.text}>비밀번호</Text>
                <View style={styles.modifyingContainer}>
                  <Text style={styles.text}>{usetModifying.password}</Text>
                </View>
              </View>
              <View style={styles.modifyingBtn}>
                <TextButton
                  fontSize={16}
                  onPress={() => {
                    setModyfyingPassWordModal(true);
                  }}
                >
                  수정
                </TextButton>
              </View>
            </View>

            <Modal animationType="fade" transparent={true} visible={modifyingPassWordModal}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Spacer size={5} />
                  <View>
                    <Text style={styles.text}>수정할 비밀번호</Text>
                    <Spacer size={10} />
                    <Input
                      style={styles.modalInput}
                      paddingHorizontal={20}
                      borderRadius={30}
                      placeholder="password"
                      onChangeText={text => setPassword(text)}
                      value={password}
                      secureTextEntry={true}
                    ></Input>
                    <Spacer size={10} />

                    <Text style={styles.text}>수정할 비밀번호 확인</Text>
                    <Spacer size={10} />

                    <Input
                      style={styles.modalInput}
                      paddingHorizontal={20}
                      borderRadius={30}
                      placeholder="confirmPassword"
                      onChangeText={text => setConfirmPassword(text)}
                      value={confirmPassword}
                      secureTextEntry={true}
                    ></Input>
                  </View>
                  <Spacer size={20} />
                  <View style={styles.modalBtnDirection}>
                    <TextButton
                      style={styles.modalConfirmBtn}
                      onPress={() => {
                        setModyfyingPassWordModal(false);
                      }}
                    >
                      취소
                    </TextButton>
                    <TextButton
                      style={styles.modalConfirmBtn}
                      onPress={() => {
                        // 수정된 비밀번호 server 전송
                      }}
                    >
                      수정
                    </TextButton>
                  </View>
                  <Spacer size={5} />
                </View>
              </View>
            </Modal>

            {/* ---------닉네임 수정 */}
            <View style={styles.childRow}>
              <View style={styles.modifyingContentWidth}>
                <Text style={styles.text}>닉네임</Text>
                <View style={styles.modifyingContainer}>
                  <Text style={styles.text}>{usetModifying.nickname}</Text>
                </View>
              </View>
              <View style={styles.modifyingBtn}>
                <TextButton
                  fontSize={16}
                  onPress={() => {
                    setModyfyingNicknameModal(true);
                  }}
                >
                  수정
                </TextButton>
              </View>
            </View>

            <Modal animationType="fade" transparent={true} visible={modifyingNicknameModal}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Spacer size={5} />
                  <View>
                    <Text style={styles.text}>수정할 닉네임</Text>
                    <Spacer size={10} />
                    <Input
                      style={styles.modalInput}
                      paddingHorizontal={20}
                      borderRadius={30}
                      placeholder="nickname"
                      onChangeText={text => setNickname(text)}
                      value={nickname}
                      secureTextEntry={true}
                    ></Input>
                    <Spacer size={10} />
                  </View>
                  <Spacer size={20} />
                  <View style={styles.modalBtnDirection}>
                    <TextButton
                      style={styles.modalConfirmBtn}
                      onPress={() => {
                        setModyfyingNicknameModal(false);
                      }}
                    >
                      취소
                    </TextButton>
                    <TextButton
                      style={styles.modalConfirmBtn}
                      onPress={() => {
                        // 수정된 닉네임 server 전송
                      }}
                    >
                      수정
                    </TextButton>
                  </View>
                  <Spacer size={5} />
                </View>
              </View>
            </Modal>

            {/* ----------이름  */}
            <Text style={styles.text}>이름</Text>
            <View style={styles.modifyingContainer}>
              <Text style={styles.text}>{usetModifying.name}</Text>
            </View>

            {/* ----------학번 */}
            <Text style={styles.text}>학번</Text>
            <View style={styles.modifyingContainer}>
              <Text style={styles.text}>{usetModifying.studentNumber}</Text>
            </View>

            {/* ----------핸드폰 번호 수정 */}
            <View style={styles.childRow}>
              <View style={styles.modifyingContentWidth}>
                <Text style={styles.text}>핸드폰 번호</Text>
                <View style={styles.modifyingContainer}>
                  <Text style={styles.text}>{usetModifying.nickname}</Text>
                </View>
              </View>
              <View style={styles.modifyingBtn}>
                <TextButton
                  fontSize={16}
                  onPress={() => {
                    setModyfyingPhoneNumModal(true);
                  }}
                >
                  수정
                </TextButton>
              </View>
            </View>
            <Modal animationType="fade" transparent={true} visible={modifyingPhoneNumModal}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Spacer size={5} />
                  <View>
                    <Text style={styles.text}>수정 핸드폰 번호</Text>
                    <Spacer size={10} />
                    <Input
                      style={styles.modalInput}
                      paddingHorizontal={20}
                      borderRadius={30}
                      placeholder="phoneNumber"
                      onChangeText={text => setPhoneNumber(text)}
                      value={phoneNumber}
                      secureTextEntry={true}
                    ></Input>
                    <Spacer size={10} />
                  </View>
                  <Spacer size={20} />
                  <View style={styles.modalBtnDirection}>
                    <TextButton
                      style={styles.modalConfirmBtn}
                      onPress={() => {
                        setModyfyingPhoneNumModal(false);
                      }}
                    >
                      취소
                    </TextButton>
                    <TextButton
                      style={styles.modalConfirmBtn}
                      onPress={() => {
                        // 수정된 핸드폰번호 server 전송
                      }}
                    >
                      수정
                    </TextButton>
                  </View>
                  <Spacer size={5} />
                </View>
              </View>
            </Modal>

            {/* 계열학과 변경학 */}
            <Text style={styles.text}>계열</Text>
            <Text style={styles.text}>학과</Text>
            <TextButton
              onPress={() => {
                navigation.navigate("Mypage");
              }}
            >
              저장
            </TextButton>
          </View>
        </Container>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  modifyingContainer: {
    borderColor: "#D8E1EC",
    borderWidth: 3,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
  childRow: {
    flexDirection: "row",
  },
  modalBtnDirection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modifyingContentWidth: {
    width: "70%",
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
    padding: 25,
  },
  modalInput: {
    width: "100%",
    paddingVertical: "5%",
    backgroundColor: "#D8E1EC",
  },
  modifyingBtn: {
    width: "30%",
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  modalConfirmBtn: {
    width: "45%",
  },
});

export default ProfileModify;
