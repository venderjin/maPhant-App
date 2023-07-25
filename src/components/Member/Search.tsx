import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SearchBar } from "@rneui/themed";

const Search = (props: any, { list }: { list: Promise<any> }) => {
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
    props.list().then((res: { data: React.SetStateAction<String[]> }) => {
      setData(res.data);
      return res.data;
    });
  }, [search, list]);

  const updateSearch = (text: string) => {
    setSearch(text);

    // 검색어를 이용하여 데이터를 필터링
    const filteredItems = data.filter(item => item.includes(text));
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
          <View style={styles.itemContainer} key={index}>
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
