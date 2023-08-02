import React from "react";
import { View, Text } from "react-native";
import { PostAPI, GetAPI } from "../../Api/fetchAPI";
import UserStorage from "../../storage/UserStorage";

const EditProfile = () => {
  PostAPI("user/changeinfo/identification", {
    email: UserStorage.userProfileSelector()
  };

export default EditProfile;
