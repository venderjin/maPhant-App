import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import Search from "../../components/Member/Search";
import { categorymajor, fieldList, majorList } from "../../Api/member/signUp";
import { Field, Formik } from "formik";
import * as Yup from "yup";

interface ISearchForm{
  field: string; 
  major: string;
}

const SearchUniversity: React.FC = () => {
  const route = useRoute();
  const validationSchema = Yup.object().shape({
    field: Yup.string().required("계열 입력해 주세요."),
    major: Yup.string().required("전공 입력해 주세요."),
  });

  const SearchForm:ISearchForm = {
    field:"", major:""
  }
  const navigation = useNavigation<NavigationProp<{ Confirm: ISearchForm }>>();

  return (
    <Formik
    initialValues={SearchForm}
    validationSchema={validationSchema}
    onSubmit={async values=>{
      // navigation.navigate("Confirm", values)
      await categorymajor(
        route.params.email,
        values.field,
        values.major,
      )
      .then(response => {
        if (response.success) {

        }
      })
      .catch(error => {
        alert();
      })
    }}
    >
{({ handleSubmit, isValid, values }) => (
    <View style={styles.container}>
      <View style={styles.FlistContainer}>
        <Field name="field" list={fieldList} component={Search}/>
      </View>
      <View style={styles.MlistContainer}>
        <Field name="major" list={majorList} component={Search}/>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit();
          navigation.navigate("Confirm" as never);
        }}
      >
        <Text style={styles.finish}> Finish</Text>
      </TouchableOpacity>
    </View>
)}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  FlistContainer: {
    flex: 1,
    marginBottom: 20,
  },
  MlistContainer: {
    flex: 1,
    marginTop: 20,
  },
  finish: {
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 40,
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
});

export default SearchUniversity;
