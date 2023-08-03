import { Field } from "formik";
import { useState } from "react";

import { Container, Input } from "../../components/common";

const SearchUser: React.FC = () => {
  const [value, setValue] = useState("");
  const onChangeText = (text: string) => {
    setValue(text);
  };
  return (
    <Container>
      {/* <Field
        placeholder="유저 검색"
        value={value}
        onChangeText={(text: string) => {
          onChangeText(text);
        }}
      /> */}
      <Input
        placeholder="유저 검색"
        value={value}
        onChangeText={text => {
          onChangeText(text);
        }}
      />
    </Container>
  );
};

export default SearchUser;
