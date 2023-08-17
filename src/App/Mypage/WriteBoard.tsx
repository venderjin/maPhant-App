import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { bringBoardList } from "../../Api/member/Others";
import { Container } from "../../components/common";
import { OtherUserForm } from "../../Navigator/MypageRoute";
import { OWriteBoardList, Pagination } from "../../types/User";
import getCurrentTime from "../Time";
import { NavigationProps } from "../../Navigator/Routes";
import BoardDetail from "../Board/BoardDetail";

const WriteBoard: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

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
  {
    console.log(writeboardList);
  }

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
        <View style={{ width: "100%", height: 2, backgroundColor: "#5299EB" }} />
        <FlatList
          data={writeboardList}
          renderItem={({ item, index }) => (
            <>
              {index >= 0 && <View style={lineStyle} />}
              <TouchableOpacity
                style={{ padding: 18 }}
                key={item.id}
                onPress={() => {
                  console.log(navigation);
                  navigation.navigate("BoardDetail", { id: item.id });
                }}
              >
                <View style={{}}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.title}</Text>
                  <Text style={{ marginTop: 10, fontSize: 15 }} numberOfLines={3}>
                    {item.body}
                  </Text>
                  <Text style={{ marginTop: 10, fontSize: 10, color: "gray" }}>
                    생성일 :{getCurrentTime(new Date(item.created_at))}
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
