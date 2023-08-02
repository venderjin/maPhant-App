import { ISignupForm } from "../../types/SignUp";
import constraints from "../constraints";
import { PostAPI } from "../fetchAPI";

function signup(form: ISignupForm) {
  return PostAPI(`/user/signup`, {
    email: form.email,
    password: form.password,
    passwordCheck: form.confirmPassword,
    nickname: form.nickname,
    name: form.name,
    phNum: form.phoneNumber,
    sno: form.studentNumber,
    univName: form.university,
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
