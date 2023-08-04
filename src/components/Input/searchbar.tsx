import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const searchbar = () => {
  const [text, setText] = useState<string>("");
  const clearTextHandler = () => {
    setText("");
  };
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <View>
          <Icon name="search" size={28} color="black" style={{}} />
        </View>
        <TextInput
          value={text}
          onChangeText={setText}
          returnKeyType="search"
          // onEndEditing={() => console.log("Search Text Update Done")}
          // onTouchStart={() => console.log("start")}
          // onTouchEnd={() => console.log("end")}
          style={{
            flex: 1,
            //backgroundColor: "pink",
            height: "100%",
            marginLeft: "3%",
            marginRight: "3%",
          }}
        />
        <TouchableOpacity onPress={clearTextHandler}>
          <Icon name="close" size={28} color="black" style={{}} />
        </TouchableOpacity>
      </View>
    </View>
    // <View style={styles.search}>
    //   <AntDesign name="search1" size={24} color="black" padding />
    //   <TextInput onChangeText={setText} value={text} style={styles.searchbar}></TextInput>
    //   <TouchableOpacity onPress={clearTextHandler}>
    //     <Icon name="close" size={28} color="black" style={{}} />
    //   </TouchableOpacity>
    // </View>
  );
};
const styles = StyleSheet.create({
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "skyblue",
    margin: 20,
    borderRadius: 30,
    padding: 20,
  },
  searchbar: {
    flex: 1,
    height: "100%",
    paddingLeft: 10,
  },
  searchContainer: {
    height: Dimensions.get("window").height * 0.07,
    flexDirection: "row",
    //backgroundColor: "teal",
    justifyContent: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    marginLeft: "5%",
    marginRight: "5%",
    paddingLeft: "3%",
    paddingRight: "3%",
    backgroundColor: "#e5e5e5",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default searchbar;
