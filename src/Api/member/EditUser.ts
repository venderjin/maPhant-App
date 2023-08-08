import UserStorage from "../../storage/UserStorage";
import { GetAPI, PostAPI } from "../fetchAPI";
import UserAPI from "../memberAPI";

const getOldData = (email: string) => {
  GetAPI("/user/changeinfo/olddata", {
    email: email,
  }).then(res => {
    return res.data;
  });
};

const changePassword = (email: string | undefined, password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
  } else {
    PostAPI("/user/changeinfo/password", {
      email: email,
      newPassword: password,
      newPasswordCheck: confirmPassword,
    }).then(res => {
      if (res.success == true) {
        console.log(res.success);
      } else {
        console.log(res.errors);
      }
    });
  }
};

const changeNickname = (email: string | undefined, nickname: string) => {
  PostAPI("/user/changeinfo/nickname", {
    email: email,
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

const changePhNum = (email: string | undefined, phoneNumber: string) => {
  PostAPI("/user/changeinfo/phnum", {
    email: email,
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

export default { getOldData, changePassword, changeNickname, changePhNum };
