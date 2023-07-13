import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Item = {
  id: number;
  name: string;
};

const Searchh = ({ setSearchUniv }: { setSearchUniv: any }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Item[]>([]);

  const data: Item[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Pineapple" },
    { id: 5, name: "Mango" },
    { id: 6, name: "Strawberry" },
    { id: 7, name: "Lemon" },
  ];

  const updateSearch = (text: string) => {
    setSearch(text);

    // 검색어를 이용하여 데이터를 필터링
    const filteredItems = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));

    setFilteredData(filteredItems);
    setSearchUniv(text);
  };

  return (
    <View>
      <SearchBar
        placeholder="Search University..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          search == "" ? (
            <></>
          ) : (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [searchUniv, setSearchUniv] = useState("");

  const handleInputChange = (value: string, setter: any) => {
    setter(value);
  };

  const renderTextInputWithLabel = (placeholder: any, value: string, setter: any) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <View>
        <Text
          style={[
            styles.label,
            {
              top: isFocused || value ? 5 : 20,
              fontSize: isFocused || value ? 12 : 16,
              color: isFocused ? "#000" : "#aaa",
            },
          ]}
        >
          {placeholder}
        </Text>
        <TextInput
          style={{ ...styles.input, marginTop: isFocused ? 25 : 20 }}
          placeholder={placeholder}
          value={value}
          onChangeText={text => handleInputChange(text, setter)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.terms}>
          <Text>커뮤니티 이용수칙 등에 대한 이용약관 동의</Text>
          <TouchableOpacity style={styles.termsButton}>
            <Text style={styles.termsText}>전체보기</Text>
          </TouchableOpacity>
        </View>
        {renderTextInputWithLabel("email", email, setEmail)}
        {renderTextInputWithLabel("pw", password, setPassword)}
        {renderTextInputWithLabel("pw confirm", passwordConfirm, setPasswordConfirm)}
        {renderTextInputWithLabel("nickname", nickname, setNickname)}
        {renderTextInputWithLabel("phone number", phoneNumber, setPhoneNumber)}
        {renderTextInputWithLabel("student number", studentNumber, setStudentNumber)}
        <Searchh setSearchUniv={setSearchUniv} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.signup}> Signup</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  input: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  label: {
    position: "absolute",
    left: 10,
    fontSize: 16,
    color: "#aaa",
    backgroundColor: "transparent",
  },
  signup: {
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 40,
  },
  scrollView: {
    marginTop: 50,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: -5,
    marginTop: 10,
  },
  searchBarInputContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
  },
  itemContainer: {
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  terms: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  termsButton: {
    // backgroundColor: "#000",
    borderBottomWidth: 1,
  },
  termsText: {
    // color: "white",
    textAlign: "center",
  },
});

export default Signup;
