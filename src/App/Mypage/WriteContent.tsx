import { useDebugValue, useEffect, useState } from "react";
import { Container } from "../../components/common";
import { Text } from "react-native";
import { OWriteContentList } from "../../types/User";
import { writeContentList } from "../../Api/member/Others";

const WriteContent: React.FC = () => {
  const [contentList, setContentList] = useState<OWriteContentList[]>([]);
  useEffect(() => {
    writeContentList()
      .then(res => {
        console.log(res.data.list);
        setContentList(res.data.list);
      })
      .catch(e => console.log(e));
  }, []);
  console.info(contentList);
  return (
    <Container>
      {contentList.map(item => (
        <Container key={item.id}>
          <Text style={{ backgroundColor: "skyblue" }}> {item.board_type} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.board_title} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.body} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.created_at} </Text>
        </Container>
      ))}
    </Container>
  );
};

export default WriteContent;
