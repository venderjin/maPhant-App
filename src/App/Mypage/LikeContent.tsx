import { useEffect, useState } from "react";
import { Container } from "../../components/common";
import { Text } from "react-native";
import { OLikeContentList } from "../../types/User";
import { likeBoardList } from "../../Api/member/Others";

const LikeContent: React.FC = () => {
  const [likeList, setLikeList] = useState<OLikeContentList[]>([]);
  useEffect(() => {
    likeBoardList()
      .then(res => {
        console.log(res.data);
        setLikeList(res.data.list);
      })
      .catch(e => console.log(e));
  }, []);
  console.info(likeList);
  return (
    <Container>
      {likeList.map(item => (
        <Container key={item.id}>
          <Text style={{ backgroundColor: "skyblue" }}> 좋아요한 글 목록 페이지 </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.type} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.title} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.body} </Text>
          <Text style={{ backgroundColor: "skyblue" }}> {item.created_at} </Text>
        </Container>
      ))}
    </Container>
  );
};

export default LikeContent;
