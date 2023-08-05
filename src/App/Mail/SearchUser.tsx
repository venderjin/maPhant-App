import { NavigationProp, useNavigation } from "@react-navigation/native";
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

    SearchNickname(nickname).then(res => {
      setNicknameAutocompleteList(
        res.data.map(item => ({ id: item.id.toString(), title: item.nickname })),
      );
    });
  }, [nickname]);

  const userNickname: INickname = {
    nickname: "",
  };
  // userNickname.nickname = "UuU";
  return (
    <Formik
      validateOnChange
      initialValues={userNickname}
      validationSchema={validationSchema}
      onSubmit={values => {
        const userId = nicknameAutocompleteList.find(item => item.title === values.nickname)?.id;

        if (!userId) return alert("존재하지 않는 상대방입니다.");
        navigation.navigate("Chatroom", { target: parseInt(userId) });
      }}
    >
      {({ handleSubmit, errors }) => (
        <Container style={{ flex: 1 }}>
          <Container borderRadius={20} style={{ marginBottom: 100, flex: 1 }}>
            <Field
              placeholder="유저 검색"
              name="nickname"
              component={Search}
              list={nicknameAutocompleteList}
              onChangeText={setNickname}
            />
          </Container>
          <Container style={{ padding: 20, flex: 0 }}>
            <TextButton
              fontColor={"white"}
              onPress={() => handleSubmitInterceptor(errors, handleSubmit)}
            >
              눌려!!
            </TextButton>
          </Container>
        </Container>
      )}
    </Formik>
  );
};

export default SearchUser;
