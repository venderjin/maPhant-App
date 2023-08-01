import { useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ColorValue,
  Dimensions,
  Image,
  ImageSourcePropType,
  ImageStyle,
  InputModeOptions,
  Keyboard,
  KeyboardAvoidingView,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type EmptyProps = {
  style?: StyleProp<ViewStyle>;
};
type SpacerProps = {
  size?: number;
} & EmptyProps;
type DefaultProps = {
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
} & EmptyProps;
type ButtonProps = {
  widthFull?: boolean; // width를 직접 설정하고 싶으면 style을 사용할 것
  onPress: () => void;
} & DefaultProps;
type TextButtonProps = {
  fontSize?: number;
  fontColor?: ColorValue;
  backgroundColor?: ColorValue;
} & ButtonProps &
  ChildrenProps;
type ChildrenProps = {
  children: React.ReactNode | React.ReactNode[];
} & DefaultProps;
type ContainerProps = {
  isFullScreen?: boolean;
  isFullWindow?: boolean;
  isItemCenter?: boolean;
  isForceKeyboardAvoiding?: boolean;
} & ChildrenProps;
type InputProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  inputMode?: InputModeOptions;
} & DefaultProps;

const Container: React.FC<ContainerProps> = props => {
  const {
    style = {},
    children,
    paddingHorizontal = 16,
    paddingVertical = 8,
    isFullScreen = false,
    isFullWindow = false,
    isItemCenter = false,
    isForceKeyboardAvoiding = false,
    borderRadius,
  } = props;

  const headerHeight = useHeaderHeight();
  const theme = useTheme();
  const adjustedHeight = () => {
    if (isFullScreen) return Dimensions.get("screen").height;
    if (isFullWindow) return Dimensions.get("window").height - headerHeight;
    return Dimensions.get("window").height;
  };
  const [height, setHeight] = useState<number | string>(adjustedHeight());
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      setHeight(adjustedHeight());
    });
    Keyboard.addListener("keyboardDidShow", e => {
      setHeight(adjustedHeight() - e.endCoordinates.height);
      setKeyboardHeight(e.endCoordinates.height);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setHeight(adjustedHeight);
      setKeyboardHeight(0);
    });
  }, []);

  const style_computed: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.background,
    paddingHorizontal,
    paddingVertical,
    minHeight: isFullScreen || isFullWindow ? height : undefined,
    height: isForceKeyboardAvoiding ? height : undefined,
    marginLeft: isItemCenter ? "auto" : undefined,
    marginRight: isItemCenter ? "auto" : undefined,
    borderRadius,
    paddingBottom: isForceKeyboardAvoiding ? 50 : undefined,
    ...(style as object),
  };

  if (isFullScreen || isFullWindow) {
    return (
      <KeyboardAvoidingView>
        <View style={style_computed}>{children}</View>
      </KeyboardAvoidingView>
    );
  }
  return <View style={style_computed}>{children}</View>;
};

type ImageBoxProps = {
  source: ImageSourcePropType;
  isCenter?: boolean;
  width?: number;
  height?: number;
} & DefaultProps;

const ImageBox: React.FC<ImageBoxProps> = props => {
  const { source, isCenter = false, style = {}, width, height, borderRadius } = props;

  const style_container = {
    alignItems: isCenter ? "center" : undefined,
    justifyContent: isCenter ? "center" : undefined,
    ...(style as object),
  } as StyleProp<ViewStyle>;

  const style_image: StyleProp<ImageStyle> = {
    width,
    height,
    borderRadius,
  };

  if (width && !height) {
    const img = Image.resolveAssetSource(source);
    style_image.height = (width / img.width) * img.height;
  } else if (!width && height) {
    const img = Image.resolveAssetSource(source);
    style_image.width = (height / img.height) * img.width;
  }

  return (
    <View style={style_container}>
      <Image source={source} style={style_image} />
    </View>
  );
};

const Spacer: React.FC<SpacerProps> = props => {
  const { size = 8, style = {} } = props;

  const style_computed: StyleProp<ViewStyle> = {
    height: size,
    ...(style as object),
  };

  return <View style={style_computed}></View>;
};

const TextButton: React.FC<TextButtonProps> = props => {
  const theme = useTheme();
  const {
    style = {},
    children,
    backgroundColor = theme.colors.primary,
    fontSize = 16,
    fontColor,
    widthFull = false,
    paddingHorizontal = 20,
    paddingVertical = 15,
    borderRadius = 100,
    onPress,
  } = props;

  const style_container: StyleProp<ViewStyle> = {
    paddingHorizontal,
    paddingVertical,
    backgroundColor,
    borderRadius,
    alignItems: "center",
    justifyContent: "center",
    ...(style as object),
  };
  const style_text: StyleProp<TextStyle> = {
    fontSize,
    textAlign: "center",
    color: fontColor,
  };

  if (widthFull) {
    style_container.width = "100%";
    style_container.alignItems = "center";
  }

  return (
    <TouchableOpacity style={style_container} onPress={onPress}>
      <Text style={style_text}>{children}</Text>
    </TouchableOpacity>
  );
};
const Input: React.FC<InputProps> = props => {
  const theme = useTheme();
  const {
    style = {},
    placeholder = "",
    onChangeText,
    value,
    secureTextEntry = false,
    paddingHorizontal = 16,
    paddingVertical = 8,
    borderRadius = 16,
    inputMode = "text",
  } = props;

  const style_container: StyleProp<ViewStyle> = {
    paddingHorizontal,
    paddingVertical,
    backgroundColor: theme.colors.card,
    borderRadius,
    ...(style as object),
  };
  const style_text: StyleProp<TextStyle> = {
    fontSize: 16,
  };

  return (
    <View style={style_container}>
      <TextInput
        style={style_text}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
      />
    </View>
  );
};

export { Container, ImageBox, Input, Spacer, TextButton };
