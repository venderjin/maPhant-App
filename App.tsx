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
  Keyboard,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./src/components/Member/Search";

type Item = {
  id: number;
  name: string;
};

const Stack = createNativeStackNavigator();

export default function() {
  return <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="test" component={SearchUniversity}/>
    </Stack.Navigator>
  </NavigationContainer>
}

function SearchUniversity() {
  const [field, setField] = useState("");
  const [major, setMajor] = useState("");
  const [searchfield, setSearchField] = useState("");
  const [searchmajor, setSearchMajor] = useState("");
  const [filteredDataField, setFilteredDataField] = useState<Item[]>([]);
  const [filteredDataMajor, setFilteredDataMajor] = useState<Item[]>([]);

  const navigation = useNavigation();

  const data1: Item[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Pineapple" },
    { id: 5, name: "Mango" },
    { id: 6, name: "Strawberry" },
    { id: 7, name: "Lemon" },
  ];
  const data2: Item[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Pineapple" },
    { id: 5, name: "Mango" },
    { id: 6, name: "Strawberry" },
    { id: 7, name: "Lemon" },
  ];

  const updateSearch1 = (text: string) => {
    setSearchField(text);

    // 검색어를 이용하여 데이터를 필터링
    const filteredItems1 = data1.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredDataField(filteredItems1);
    setField(text);
  };

  const updateSearch2 = (text: string) => {
    setSearchMajor(text);

    // 검색어를 이용하여 데이터를 필터링
    const filteredItems2 = data2.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredDataMajor(filteredItems2);
    setMajor(text);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingContainer}>
      <View style={styles.FlistContainer}>
      <Search filteredData={filteredDataField} />
      <View>
        <SearchBar
          placeholder="Search Field..."
          onChangeText={updateSearch1}
          value={searchfield}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />

        <FlatList
          data={filteredDataField}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            field == "" ? (
              <></>
            ) : (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )
          }
        />
      </View>
      </View>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingContainer}>
      <View style={styles.MlistContainer}>
      <Search filteredData={filteredDataMajor} />
      <View>
        <SearchBar
          placeholder="Search Major..."
          onChangeText={updateSearch2}
          value={searchmajor}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />

        <FlatList
          data={filteredDataMajor}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            major == "" ? (
              <></>
            ) : (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )
          }
        />
      </View>
      </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Confirm" as never);
        }}
      >
        <Text style={styles.finish}> Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  FlistContainer: {
    flex: 1,
    marginBottom: 40,
  },
  MlistContainer: {
    flex: 1,
    marginTop: 30,
  },
  finish: {
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
});

// export default SearchUniversity;
