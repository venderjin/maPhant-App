import { useRoute } from "@react-navigation/native";
import { Container } from "../../components/common";
import { Text } from "react-native";
import { OtherUserForm } from "../../Navigator/MypageRoute";
import { useEffect, useState } from "react";
import { bringBoardList } from "../../Api/member/Others";
import { Pagination, OWriteBoardList } from "../../types/User";

// ({
//   body: "ss",
//   category_id: 57,
//   comment_cnt: 8,
//   created_at: "2023-08-13T17:22:16",
//   id: 315,
//   images_url: null,
//   isLike: false,
//   is_anonymous: true,
//   is_complete: false,
//   is_hide: 0,
//   like_cnt: 0,
//   modified_at: null,
//   report_cnt: 0,
//   title: "s",
//   type: "지식 게시판",
//   user_id: 133,
// });
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
        </Container>
      ))}
    </Container>
  );
};

export default WriteBoard;
