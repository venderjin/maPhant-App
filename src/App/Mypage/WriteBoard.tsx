import { Container } from "../../components/common";
import { Text } from "react-native";

const WriteBoard: React.FC = () => {
  return (
    <Container>
      <Text style={{ backgroundColor: "skyblue" }}> 작성한 게시글 목록 페이지 </Text>
    </Container>
  );
};

export default WriteBoard;
