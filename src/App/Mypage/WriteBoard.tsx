import { useRoute } from "@react-navigation/native";
import { Container } from "../../components/common";
import { Text } from "react-native";
import { OtherUserForm } from "../../Navigator/MypageRoute";

const WriteBoard: React.FC = () => {
  const route = useRoute();
  const params = route.params as OtherUserForm;
  console.log(params.id);
  return (
    <Container>
      <Text style={{ backgroundColor: "skyblue" }}> 작성한 게시글 목록 페이지 </Text>
    </Container>
  );
};

export default WriteBoard;
