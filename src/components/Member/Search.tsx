import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SearchBar } from "@rneui/themed";
type Item = {
  id: number;
  name: string;
};

const Search = (props: any) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Item[]>([]);

  const {
    field: { name, onBlur, value },
    form: { errors, touched, setFieldValue, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];

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
  };

  return (
    <View>
      <SearchBar
        onChangeText={text => {
          updateSearch(text);
          setFieldValue(name, text);
        }}
        value={value}
        onBlur={() => {
          onBlur(name);
          setFieldTouched(name);
        }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      {filteredData.map(item =>
        search === "" ? null : (
          <View style={styles.itemContainer} key={item.id.toString()}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  errorText: {
    fontSize: 12,
    marginHorizontal: 15,
    color: "red",
  },
});

export default Search;
