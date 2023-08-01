import { useContext, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import createStyle from "../Home/Home";
import { ThemeContext } from "./ThemeContext";

const Theme = () => {
  const theme = useTheme();
  const [styles, setStyleSheet] = useState<any>(createStyle(theme));
  const [isDark, setIsDark] = useContext(ThemeContext);
  useEffect(() => {
    setStyleSheet(createStyle(theme));
  }, [isDark]);
};
export default Theme;
