import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar } from "@rneui/themed";
import { universityList } from "../../Api/member/signUp";

const Search = (props: any) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<String[]>([]);
  const [filteredData, setFilteredData] = useState<String[]>([]);

  const {
    field: { name, onBlur, value },
    form: { errors, touched, setFieldValue, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];

  useEffect(() => {
    universityList().then(res => {
      console.log(res.data);
      setData(res.data);
      return res.data;
    });
  }, [search]);

  const updateSearch = (text: string) => {
    setSearch(text);

    // 검색어를 이용하여 데이터를 필터링
    const filteredItems = data.filter(item => item.includes(text));
    console.log(text);
    console.log(filteredItems);
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
      {filteredData.map((item, index) =>
        search === "" ? null : (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
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
