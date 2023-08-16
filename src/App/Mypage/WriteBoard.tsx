import { useRoute } from "@react-navigation/native";
import { Container } from "../../components/common";
import { Text } from "react-native";
import { OtherUserForm } from "../../Navigator/MypageRoute";
import { useEffect, useState } from "react";
import { bringBoardList } from "../../Api/member/Others";
import { Pagination, OWriteBoardList } from "../../types/User";
import getCurrentTime from "../Time";

const WriteBoard: React.FC = () => {
  const route = useRoute();
  const params = route.params as OtherUserForm;
  const [writeboardList, setWriteBoardList] = useState<OWriteBoardList[]>([]);
  const [page, setPage] = useState<Pagination[]>([]);

  useEffect(() => {
    bringBoardList(params.id)
      .then(res => {
        setWriteBoardList(res.data.list);
        setPage(res.data.pagination);
        console.log("????");
      })
      .catch(e => console.error(e));
  }, []);
  return (
    <Container>
      <Text style={{ backgroundColor: "skyblue" }}> 작성한 게시글 목록 페이지 </Text>
      {writeboardList.map(item => (
        <Container key={item.id}>
          <Text style={{ backgroundColor: "skyblue" }}>{item.title}</Text>
          <Text style={{ backgroundColor: "skyblue" }}>
            {getCurrentTime(new Date(item.created_at))}
          </Text>
        </Container>
      ))}
    </Container>
  );
};

export default WriteBoard;
