import constraints from "../constraints";

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
    body: JSON.stringify({ email: email }),
  }).then(response => response.json());
}

function validateNickname(nickname: String) {
  return fetch(`${constraints.SERVER_URL}/user/validation/nickname`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname: nickname }),
  }).then(response => response.json());
}

export { signup, validateEmail, validateNickname };
