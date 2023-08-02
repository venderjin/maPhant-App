import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const styleMap: Map<Theme, object> = new Map();

const Styles: any = (theme: Theme) => {
  if (styleMap.has(theme)) return styleMap.get(theme);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderTopWidth: 1,
      borderTopColor: "#D8E1EC",
    },
    body: {
      borderBottomColor: "#D0D0D0",
      borderBottomWidth: 1,
      paddingVertical: 10,
      backgroundColor: "#D8E1EC",
    },
    showbody: {
      borderBottomColor: "#D0D0D0",
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
    head: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    body2: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    content: {
      flex: 1,
      justifyContent: "flex-start",
    },
    title: {
      color: theme.colors.text,
      fontSize: 20,
      justifyContent: "flex-start",
      fontWeight: "bold",
    },
    board: {
      fontSize: 15,
      color: "red",

      justifyContent: "flex-start",
    },
    userName: {
      fontSize: 10,
      color: "gray",
    },
    comment: {
      fontSize: 15,
      marginVertical: 5,
    },
    bottom: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    good: {
      flex: 1,
      fontSize: 10,
      justifyContent: "flex-start",
    },
    command: {
      color: theme.colors.text,

      flex: 9,
      fontSize: 10,
    },
  });

  styleMap.set(theme, styles);
  console.warn(styleMap.get(theme));
  return styleMap.get(theme);
};
export default Styles;
