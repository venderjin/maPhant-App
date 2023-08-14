import { useNavigation } from "@react-navigation/native";
import { Field, Formik, FormikErrors } from "formik";
import { useEffect, useState } from "react";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import * as Yup from "yup";

import { SearchNickname } from "../../Api/member/FindUser";
import { validateNickname } from "../../Api/member/signUp";
import { Container, TextButton } from "../../components/common";
import Search from "../../components/Input/Search";
import { NavigationProps } from "../../Navigator/Routes";
import { INickname } from "../../types/SearchUser";

const SearchUser: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [nickname, setNickname] = useState("");
  const [nicknameAutocompleteList, setNicknameAutocompleteList] = useState<
    TAutocompleteDropdownItem[]
  >([]);

  const handleSubmitInterceptor = (values: FormikErrors<INickname>, handleSubmit: () => void) => {
    if (Object.keys(values).length !== 0) {
      return alert("상대방 검증 실패:\n" + Object.values(values).join("\n"));
    }

    return handleSubmit();
  };

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required("")
      .test((value, testContext) => {
        return validateNickname(value)
          .then(result => {
            if (result.success)
              // Signup에서  쓴 닉네임 검증 함수라서 success === true 이면 존재하지 않는 별명임
              return testContext.createError({ message: "존재하지 않는 별명입니다." });
            return true;
          })
          .catch(error => {
            if (error === "이미 사용중인 별명입니다.") return true;
            return testContext.createError({ message: error });
          });
      }),
  });

  useEffect(() => {
    if (nickname.trim().length < 2) return;
    SearchNickname(nickname)
      .then(res => {
        setNicknameAutocompleteList(
          res.data.map(item => ({ id: item.id.toString(), title: item.nickname })),
        );
      })
      .catch(error => console.log(error));
  }, [nickname]);

  const userNickname: INickname = {
    nickname: "",
  };
  return (
    <Container
      isFullScreen={true}
      isForceKeyboardAvoiding={true}
      style={{ padding: 20, backgroundColor: "white", flex: 1 }}
    >
      <Formik
        validateOnChange
        initialValues={userNickname}
        validationSchema={validationSchema}
        onSubmit={values => {
          const userId = nicknameAutocompleteList.find(item => item.title === values.nickname)?.id;
          if (!userId) return alert("존재하지 않는 상대방입니다.");
          if (values.nickname.length === 0) return alert("에바야");
          return navigation.navigate("Chatroom", {
            id: parseInt(userId),
            nickname: values.nickname,
            roomId: 0,
          });
        }}
      >
        {({ handleSubmit, errors }) => (
          <Container style={{ flex: 1 }}>
            <Container
              borderRadius={20}
              style={{
                marginTop: 15,
                flex: 1,
                padding: 10,
              }}
            >
              <Field
                placeholder="유저 검색"
                name="nickname"
                component={Search}
                list={nicknameAutocompleteList}
                onChangeText={(text: string) => setNickname(text)}
              />
            </Container>
            <Container>
              <TextButton
                style={{
                  flex: 0,
                  borderWidth: 0.25,
                  borderColor: nickname.length !== 0 ? "white" : "black",
                  backgroundColor: nickname.length !== 0 ? "#5299EB" : "#A0A0A0",
                  marginBottom: 30,
                }}
                fontColor={nickname.length !== 0 ? "white" : "#D3D3D3"}
                onPress={() => handleSubmitInterceptor(errors, handleSubmit)}
                disabled={!nickname.length}
              >
                채팅하기
              </TextButton>
            </Container>
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default SearchUser;
