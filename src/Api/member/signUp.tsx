import constraints from "../constraints";
import { PostAPI } from "../fetchAPI";

function signup(
  email: string,
  password: string,
  passwordChk: string,
  nickname: string,
  name: string,
  phoneNo: string,
  sNo: string,
  university: string,
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
  })
    .then(response => response.json())
    .catch(error => {
      // 기타 오류 처리 (네트워크 요청 오류, 서버 응답 파싱 오류 등)
      console.error("오류 발생:", error);
      throw new Error("요청 처리 중 오류가 발생하였습니다.");
    });
}

function validateEmail(email: string) {
  return fetch(`${constraints.SERVER_URL}/user/validation/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(response => response.json());
}
function validatePassword(password: string) {
  return fetch(`${constraints.SERVER_URL}/user/validation/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  }).then(response => response.json());
}

function validateNickname(nickname: string) {
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

function sendEmail(email: string) {
  return PostAPI(`/user/changepw/sendemail`, { email: email });
}

function authenticationCode(email: string, authCode: string) {
  return PostAPI(`/user/changepw/authenticationcode`, {
    email,
    authCode,
  });
}

function newPassword(email: string, password: string, passwordChk: string) {
  return PostAPI(`/user/changepw/newpassword`, {
    email,
    password,
    passwordChk,
  });
}

function categorymajor(email: string, category: string, major: string) {
  return PostAPI(`/user/selection/categorymajor`, {
    email,
    category,
    major,
  });
}
function confirmEmail(email: string, authCode: string) {
  return PostAPI(`/email/confirmEmail`, {
    email,
    authCode,
  });
}

export {
  authenticationCode,
  categorymajor,
  confirmEmail,
  fieldList,
  majorList,
  newPassword,
  sendEmail,
  signup,
  universityList,
  validateEmail,
  validateNickname,
  validatePassword,
};
