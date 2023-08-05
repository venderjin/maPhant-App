import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Field, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { SearchNickname } from "../../Api/member/FindUser";
import { majorList, universityList, validateNickname } from "../../Api/member/signUp";
import { Container, TextButton } from "../../components/common";
import Search from "../../components/Member/Search";
import UIStore from "../../storage/UIStore";
import { INickname } from "../../types/SearchUser";

const SearchUser: React.FC = () => {
  const navigation = useNavigation<NavigationProp<{ Chatroom: INickname }>>();
  const [nickname, setNickname] = useState("");
  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required("")
      .test(async (value, testContext) => {
        const result = await validateNickname(value);
        if (result.success) return true;
        return testContext.createError({ message: result.errors });
      }),
  });
  const onChangeText = (text: string) => {
    setNickname(text);
    userNickname.nickname = text;
  };
  const userNickname: INickname = {
    nickname: "",
  };
  // userNickname.nickname = "UuU";
  return (
    <Formik
      initialValues={userNickname}
      validationSchema={validationSchema}
      onSubmit={async values => {
        // console.log(values);
        console.info("tq 좀 떠라");
        UIStore.showLoadingOverlay();
        // navigation.navigate("Chatroom");
        await SearchNickname(values)
          .then(() => {
            return navigation.navigate("Chatroom");
          })
          .catch(err => alert(err.errors));
      }}
    >
      {({ handleSubmit }) => (
        <Container style={{ flex: 1 }}>
          <Container borderRadius={20} style={{ marginBottom: 100 }}>
            <Field
              value={nickname}
              onChangeText={(text: string) => {
                onChangeText(text);
                console.log(userNickname.nickname);
              }}
              placeholder="유저 검색"
              name="search"
              component={Search}
              list={() => SearchNickname(userNickname)}
            />
          </Container>
          <Container style={{ padding: 20 }}>
            <TextButton fontColor={"white"} onPress={handleSubmit}>
              눌려!!
            </TextButton>
          </Container>
        </Container>
      )}
    </Formik>
  );
};

export default SearchUser;
