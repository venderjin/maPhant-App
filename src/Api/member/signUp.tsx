import { ISignupForm } from "../../types/SignUp";
import { GetAPI, PostAPI } from "../fetchAPI";

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
  return PostAPI(`/user/validation/email`, { email });
}
function validatePassword(password: string) {
  return PostAPI(`/user/validation/password`, { password });
}

function validateNickname(nickname: string) {
  return PostAPI(`/user/validation/nickname`, { nickname });
}

function universityList() {
  return GetAPI(`/user/universitylist`);
}

function fieldList() {
  return GetAPI(`/user/categorylist`);
}

function majorList() {
  return GetAPI(`/user/majorlist`);
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
