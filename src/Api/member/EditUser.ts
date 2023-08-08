import Toast from "react-native-root-toast";

import UserStorage from "../../storage/UserStorage";
import { PostAPI } from "../fetchAPI";
import UserAPI from "../memberAPI";

const getOldData = () => {
  PostAPI("/user/changeinfo/olddata").then(res => {
    if (res.success === true) {
      return res["data"];
    } else {
      console.log(res.errors);
      return;
    }
  });
  return console.log("서버 통신 오류");
};

const changePassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
  } else {
    PostAPI("/user/changeinfo/password", {
      newPassword: password,
      newPasswordCheck: confirmPassword,
    }).then(res => {
      if (res.success == true) {
        console.log(res.success);
      } else if (res.success == false) {
        console.log(res.errors);
      }
    });
  }
};

const changeNickname = (nickname: string) => {
  PostAPI("/user/changeinfo/nickname", {
    nickname: nickname,
  }).then(res => {
    if (res.success == true) {
      console.log(res.success);
    } else {
      console.log(res.errors);
    }
    UserAPI.getProfile().then(res => {
      UserStorage.setUserProfile(res.data);
    });
  });
};

const changePhNum = (phoneNumber: string) => {
  PostAPI("/user/changeinfo/phnum", {
    phNum: phoneNumber,
  }).then(res => {
    if (res.success == true) {
      console.log(res.success);
    } else {
      console.log(res.errors);
      alert("번호 형식을 확인해주세요. \n ex) 010-0000-0000");
    }
  });
};

const addCategoryAndMajor = (category: string, major: string) => {
  PostAPI("/user/changeinfo/categorymajor", {
    category: category,
    major: major,
  }).then(res => {
    if (res.success == true) {
      console.log(res.success);
    } else {
      console.log(res.errors);
    }
  });
};

export default { getOldData, changePassword, changeNickname, changePhNum, addCategoryAndMajor };
