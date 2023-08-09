import { useNavigation } from "@react-navigation/native";
import { Field, Formik, FormikErrors } from "formik";
import React, { useCallback, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { useSelector } from "react-redux";

import { PostAPI } from "../../Api/fetchAPI";
import EditUser from "../../Api/member/EditUser";
import { categorymajor, fieldList, majorList } from "../../Api/member/signUp";
import UserAPI from "../../Api/memberAPI";
import { Container, Input, Spacer, TextButton } from "../../components/common";
import SearchByFilter from "../../components/Input/SearchByFilter";
import { NavigationProps } from "../../Navigator/Routes";
import UIStore from "../../storage/UIStore";
import UserStorage from "../../storage/UserStorage";

interface ISearchForm {
  field: string;
  major: string;
}

const ProfileModify: React.FC = () => {
  const profile = useSelector(UserStorage.userProfileSelector);
  const category = useSelector(UserStorage.userCategorySelector);

  type UserType = {
    email?: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    name?: string;
    phoneNumber: string;
    studentNumber?: number;
  };

  type UserCategory = {
    field?: string;
    major?: string;
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

  const useCategoryModifying: UserCategory = {
    field: category?.categoryName,
    major: category?.majorName,
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modifyingPassWordModal, setModyfyingPassWordModal] = useState(false);
  const [modifyingNicknameModal, setModyfyingNicknameModal] = useState(false);
  const [modifyingPhoneNumModal, setModyfyingPhoneNumModal] = useState(false);
  const [modifyingFieldModal, setModyfyingFieldModal] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  // const route = useRoute();
  // const params = route.params as SignUpFormParams;

  const onSubmit = useCallback((errors: FormikErrors<ISearchForm>, next: () => void) => {
    if (Object.keys(errors).length === 0) {
      next();
    }

    const msg = Object.values(errors)
      .map(val => `${val}`)
      .join("\n");
    return Toast.show(msg);
  }, []);

  const SearchForm: ISearchForm = {
    field: "",
    major: "",
  };
  return (
    <Container style={{ backgroundColor: "white" }} paddingHorizontal={10}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
                        EditUser.changePassword(password, confirmPassword);
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
                        EditUser.changeNickname(nickname);
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
                      keyboardType="numbers-and-punctuation"
                      inputMode="tel"
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
                        EditUser.changePhNum(phoneNumber);
                      }}
                    >
                      수정
                    </TextButton>
                  </View>
                  <Spacer size={5} />
                </View>
              </View>
            </Modal>

            {/* 계열 추가하기 */}
            <View style={styles.childRow}>
              <View style={styles.modifyingContentWidth}>
                <Text style={styles.text}>계열 / 학과</Text>
                <View style={styles.modifyingContainer}>
                  <Text style={styles.text}>
                    {useCategoryModifying.field} - {useCategoryModifying.major}
                  </Text>
                  <Text style={styles.text}>
                    {useCategoryModifying.field} - {useCategoryModifying.major}
                  </Text>
                  <Text style={styles.text}>
                    {useCategoryModifying.field} - {useCategoryModifying.major}
                  </Text>
                  <Text style={styles.text}>
                    {useCategoryModifying.field} - {useCategoryModifying.major}
                  </Text>
                </View>
              </View>
              <View style={styles.modifyingBtn}>
                <TextButton
                  fontSize={16}
                  onPress={() => {
                    setModyfyingFieldModal(true);
                  }}
                >
                  추가
                </TextButton>
                <TextButton
                  fontSize={16}
                  onPress={() => {
                    setModyfyingFieldModal(true);
                  }}
                >
                  삭제
                </TextButton>
              </View>
            </View>
            <Modal animationType="fade" transparent={true} visible={modifyingFieldModal}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Formik
                    initialValues={SearchForm}
                    // validationSchema={validationSchema}
                    onSubmit={async values => {
                      UIStore.showLoadingOverlay();
                      await categorymajor(usetModifying.email, values.field, values.major)
                        .then(response => {
                          if (response.success) {
                            console.log("학과, 계열 추가완료");
                          }
                        })
                        .catch(error => {
                          alert(`학과 등록에 실패하였습니다.: ${error}`);
                        })
                        .finally(() => UIStore.hideLoadingOverlay());
                    }}
                  >
                    {({ handleSubmit, errors }) => (
                      <Container style={styles.modalContainer}>
                        <Text style={styles.text}>계열 추가하기</Text>
                        <Container style={styles.FlistContainer}>
                          <Field
                            placeholder="계열 입력해 주세요."
                            name="field"
                            list={fieldList}
                            component={SearchByFilter}
                          />
                        </Container>
                        <Spacer size={10} />
                        <Text style={styles.text}>학과 추가하기</Text>
                        <Container style={styles.MlistContainer}>
                          <Field
                            placeholder="전공 입력해 주세요."
                            name="major"
                            list={majorList}
                            component={SearchByFilter}
                          />
                        </Container>
                        <View style={styles.modalBtnDirection}>
                          <TextButton
                            style={styles.modalConfirmBtn}
                            onPress={() => {
                              setModyfyingFieldModal(false);
                            }}
                          >
                            취소
                          </TextButton>
                          <TextButton
                            style={styles.modalConfirmBtn}
                            onPress={() => {
                              onSubmit(errors, handleSubmit);
                              // 계열 추가하기
                            }}
                          >
                            추가
                          </TextButton>
                        </View>
                      </Container>
                    )}
                  </Formik>
                </View>
              </View>
            </Modal>

            <TextButton
              style={{
                marginVertical: 20,
              }}
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
    flexDirection: "column",
    borderColor: "#D8E1EC",
    borderWidth: 3,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  childRow: {
    flexDirection: "row",
  },
  modalBtnDirection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modifyingContentWidth: {
    width: "75%",
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
  modalInput: {
    width: "100%",
    paddingVertical: "5%",
    backgroundColor: "#D8E1EC",
  },
  modifyingBtn: {
    width: "25%",
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  modalConfirmBtn: {
    width: "45%",
  },
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  FlistContainer: {
    flex: 1,
  },
  MlistContainer: {
    flex: 1,
    marginBottom: 20,
    // paddingHorizontal: 40,
  },
});

export default ProfileModify;
