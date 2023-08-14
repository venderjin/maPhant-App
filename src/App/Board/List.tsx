import { Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { listArticle, searchArticle } from "../../Api/board";
import { Container } from "../../components/common";
import SearchBar from "../../components/Input/searchbar";
import { BoardArticle, BoardType } from "../../types/Board";
import { NavigationProps } from "../../types/Navigation";
import PostSummary from "./PostSummary";

const DetailList: React.FC = () => {
  const params = useRoute().params as { boardType: BoardType };
  const boardType = params?.boardType;
  const [boardData, setboardData] = useState<BoardArticle[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp<NavigationProps>>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<BoardArticle[]>([]);

  const fetchData = async () => {
    try {
      if (!boardType) {
        setRefreshing(false);
        return;
      }
      const data = await listArticle(boardType.id, 1, 50, 1);
      if (data.data) {
        setboardData(data.data as BoardArticle[]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = async (searchText: string) => {
    setSearchQuery(searchText);
    if (searchText.trim() === "") {
      setSearchResults([]);
      console.log("searchText is empty");
      return;
    }
    try {
      const data = await searchArticle(searchText, boardType.id); // Implement your searchArticle function to call the API for search results
      setSearchResults(data.data as BoardArticle[]);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBoard = () => {
    console.log("글쓰기 화면으로 바뀌어야함");
    navigation.navigate("Post", { boardType: boardType });
  };

  const detailContent = (board: BoardArticle) => {
    navigation.navigate("QnAdetail", { id: board.boardId });
  };

  const displayData = searchQuery.trim() === "" ? boardData : searchResults;

  return (
    <Container style={styles.container}>
      <SearchBar onSearchChange={handleSearch} />
      <FlatList
        data={displayData}
        renderItem={({ item: board }) => (
          <View key={board.boardId} style={styles.body}>
            <Pressable onPress={() => detailContent(board)}>
              <PostSummary post={board} boardType={boardType} />
            </Pressable>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <View style={styles.btn}>
        <TouchableOpacity onPress={createBoard}>
          <Text>
            <Entypo name="plus" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: "#e9ecef",
    borderRadius: 30,
    zIndex: 99,
    position: "absolute",
    right: "10%",
    bottom: "5%",
    padding: 10,
  },
});

export default DetailList;
