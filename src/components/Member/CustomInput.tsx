import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

const CustomInput = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (value: string, setter: any) => {
    setter(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const {
    field: { name, onBlur, value },
    form: { errors, touched, setFieldValue, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];
  return (
    <View>
      <Text
        style={[
          styles.label,
          {
            top: isFocused ? 5 : 20,
            fontSize: isFocused ? 12 : 16,
            color: isFocused ? "#000" : "#aaa",
          },
        ]}
      >
        {name}
      </Text>
      <TextInput
        style={{ ...styles.input, marginTop: isFocused ? 25 : 20 }}
        value={value}
        onChangeText={text => {
          handleInputChange(text, setFieldValue);
          setFieldValue(name, text);
        }}
        onBlur={() => {
          handleBlur();
          onBlur(name);
          setFieldTouched(name);
        }}
        onFocus={handleFocus}
        keyboardType={name === "phoneNumber" || name === "studentNumber" ? "numeric" : "default"}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  label: {
    position: "absolute",
    left: 10,
    fontSize: 16,
    color: "#aaa",
    backgroundColor: "transparent",
  },
  errorText: {
    fontSize: 12,
    marginHorizontal: 15,
    color: "red",
  },
});

export default CustomInput;
