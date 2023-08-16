import { useRoute } from "@react-navigation/native";
import { useDebugValue, useEffect, useState } from "react";
import { Text } from "react-native";

import { writeContentList } from "../../Api/member/Others";
import { Container } from "../../components/common";
import { OtherUserId, OWriteContentList } from "../../types/User";
import getCurrentTime from "../Time";

const WriteContent: React.FC = () => {
  const route = useRoute();
  const params = route.params as OtherUserId;
  const [contentList, setContentList] = useState<OWriteContentList[]>([]);
  useEffect(() => {
    writeContentList(params.id)
      .then(res => {
        setContentList(res.data.list);
      })
      .catch(e => console.error(e));
  }, []);
  return (
    <Container>
      {contentList.map(item => (
        <Container key={item.id}>
          <Text style={{ backgroundColor: "skyblue" }}> {item.board_type} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.board_title} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.body} </Text>
          <Text style={{ backgroundColor: "skyblue" }}>
            {" "}
            {getCurrentTime(new Date(item.created_at))}{" "}
          </Text>
        </Container>
      ))}
    </Container>
  );
};

export default WriteContent;
