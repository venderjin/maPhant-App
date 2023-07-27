import constraints from "../constraints";
import { PostAPI } from "../fetchAPI";

function signup(
  email: String,
  password: String,
  passwordChk: String,
  nickname: String,
  name: String,
  phoneNo: String,
  sNo: String,
  university: String,
) {
  return fetch(`${constraints.SERVER_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      passwordCheck: passwordChk,
      nickname: nickname,
      name: name,
      phNum: phoneNo,
      sno: sNo,
      univName: university,
    }),
  }).then(response => response.json());
}

function validateEmail(email: String) {
  return fetch(`${constraints.SERVER_URL}/user/validation/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(response => response.json());
}

function validateNickname(nickname: String) {
  return fetch(`${constraints.SERVER_URL}/user/validation/nickname`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname }),
  }).then(response => response.json());
}

function universityList() {
  return fetch(`${constraints.SERVER_URL}/user/universitylist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json());
}

function fieldList() {
  return fetch(`${constraints.SERVER_URL}/user/categorylist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json());
}

function majorList() {
  return fetch(`${constraints.SERVER_URL}/user/majorlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json());
}

function sendEmail(email: String) {
  return PostAPI(`user/changepw/sendemail`, { email: email });
}

function authenticationCode(email: String, authCode: String) {
  return PostAPI(`user/changepw/authenticationcode`, {
    email,
    authCode,
  });
}

function newPassword(email: String, password: String, passwordChk: String) {
  return PostAPI(`user/changepw/newpassword`, {
    email,
    password,
    passwordChk,
  });
}

function categorymajor(email: String, category: String, major: String) {
  return PostAPI(`user/selection/categorymajor`, {
    email,
    category,
    major,
  });
}
function confirmEmail(email: string, authCode: string) {
  return PostAPI(`email/confirmEmail`, {
    email,
    authCode,
  });
}

export {
  signup,
  validateEmail,
  validateNickname,
  universityList,
  fieldList,
  majorList,
  sendEmail,
  authenticationCode,
  newPassword,
  categorymajor,
  confirmEmail,
};
