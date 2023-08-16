import { useRoute } from "@react-navigation/native";
import { Container } from "../../components/common";
import { Text, View } from "react-native";
import { OtherUserForm } from "../../Navigator/MypageRoute";
import { useEffect, useState } from "react";
import { bringBoardList } from "../../Api/member/Others";
import { Pagination, OWriteBoardList } from "../../types/User";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

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
  const lineStyle = { width: "100%", height: 1.3, backgroundColor: "#5299EB" };
  useEffect(() => {
    bringBoardList(params.id)
      .then(res => {
        setWriteBoardList(res.data.list);
        setPage(res.data.pagination);
      })
      .catch(e => console.error(e));
  }, []);
  console.log(page);
  return (
    <Container style={{ backgroundColor: "white", display: "flex", flex: 1 }}>
      <Container style={{ alignItems: "center", flex: 0.1, justifyContent: "center" }}>
        <Text style={{ fontSize: 20, color: "#5299EB", fontWeight: "bold" }}>
          작성한 게시글 목록 페이지
        </Text>
      </Container>
      <Container style={{ flex: 1 }}>
        <View>
          <Text style={{}}>Total page : {page.totalRecordCount} </Text>
        </View>
        <FlatList
          data={writeboardList}
          renderItem={({ item, index }) => (
            <>
              {index >= 0 && <View style={lineStyle} />}
              <TouchableOpacity style={{ padding: 18 }} key={item.id}>
                <View style={{}}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.title}</Text>
                  <Text style={{ marginTop: 10, fontSize: 15 }} numberOfLines={3}>
                    {item.body}
                  </Text>
                  <Text style={{ marginTop: 10, fontSize: 10, color: "gray" }}>
                    생성일 :{item.created_at.toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
              {index === writeboardList.length - 1 && <View style={lineStyle} />}
            </>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Container>
    </Container>
  );
};

export default WriteBoard;
