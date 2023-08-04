import { SearchBar } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";

import { dataResponse } from "../../Api/fetchAPI";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Search = (props: any) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<TAutocompleteDropdownItem[]>([]);
  const handleItemClick = (itemTitle: string) => {
    setSearch(itemTitle);
    setFieldValue(name, itemTitle);
  };

  const {
    field: { name, onBlur, value },
    form: { setFieldValue, setFieldTouched },
    list,
    ...inputProps
  } = props;

  useEffect(() => {
    props.list().then((res: dataResponse) => {
      setData(res.data as string[]);
    });
  }, [list]);

  useEffect(() => {
    setFieldValue(name, search);
    updateSearch(search);
  }, [search]);

  const sliceResults = useCallback((items: TAutocompleteDropdownItem[]) => {
    const slicedItems = [];
    let i = 0;
    const numColumns = 3;
    while (i < items.length) {
      slicedItems.push(items.slice(i, i + numColumns));
      i += numColumns;
    }
    return slicedItems;
  }, []);

  const updateSearch = useCallback(
    (text: string) => {
      // 검색어를 이용하여 데이터를 필터링
      const filteredItems = data.filter(item => item.includes(text));
      const formattedData = filteredItems
        .map((item, index) => ({
          id: index.toString(),
          title: item.toString(),
        }))
        .flat();
      setFilteredData(formattedData);
    },
    [data],
  );

  const renderItemGroup = useCallback(
    (itemGroup: TAutocompleteDropdownItem[]) => (
      <View style={styles.itemContainer}>
        {itemGroup.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => (item && item.title ? handleItemClick(item.title) : null)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={text => {
          setFieldValue(name, text);
          setSearch(text);
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

      <FlatList
        keyboardShouldPersistTaps="handled"
        data={sliceResults(filteredData)}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled // 이 옵션을 추가하여 3개씩 스크롤되도록 설정합니다.
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderItemGroup(item)}
          </ScrollView>
        )}
      />

      {/* <AutocompleteDropdown
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
        dataSet={filteredData.map((item, index) => ({
          id: index.toString(),
          title: item.title || "",
        }))}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  errorText: {
    fontSize: 12,
    marginHorizontal: 15,
    color: "red",
  },
});

export default Search;
