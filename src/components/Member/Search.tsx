import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Touchable } from "react-native";
import { SearchBar } from "@rneui/themed";
import { universityList } from "../../Api/member/signUp";
import { AutocompleteDropdown, TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";

const Search = (props: any, { list }: { list: Promise<any> }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<String[]>([]);
  const [filteredData, setFilteredData] = useState<TAutocompleteDropdownItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (itemTitle: string) => {
    setSearch(itemTitle);
    setFieldValue(name, itemTitle);
  }

  const {
    field: { name, onBlur, value },
    form: { errors, touched, setFieldValue, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];

  useEffect(() => {
    props.list().then(res => {
      setData(res.data);
      const formattedData = res.data.map((item:any, index:any) => ({ id: index.toString(), title: item }));
      setFilteredData(formattedData);
      return res.data;
    });
  }, [search, list]);

  const updateSearch = (text: string) => {
    setSearch(text);

    // 검색어를 이용하여 데이터를 필터링
    const filteredItems = data.filter(item => item.toLowerCase().includes(text.toLowerCase()));
    console.log(text);
    console.log(filteredItems);
    const formattedData = filteredItems.map((item, index) => ({ id: index.toString(), title: item.toString() }));
    setFilteredData(formattedData);
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
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => (item && item.title ? handleItemClick(item.title) : null)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ),
      )}

      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={selectedItem}
        onSelectItem={(item: TAutocompleteDropdownItem | null) => {
          if (item) {
            setSearch(item.title || "");
            setSelectedItem(item.title || "");
            setFieldValue(name, item.title || "");
          } else {
            setSearch("");
            setSelectedItem("");
            setFieldValue(name, "");
          }
        }}
        dataSet={
          filteredData.map((item, index) => ({
            id : index.toString(), title : item.title || ""
        }))}
      />
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
