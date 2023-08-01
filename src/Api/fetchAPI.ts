import constraints from "./constraints";
import UserStorage from "../storage/UserStorage";
import { sha512 } from "js-sha512";

type statusResponse = {
  success: boolean;
  message?: string;
};
type dataResponse = {
  data?: object;
} & statusResponse;

type Method = "GET" | "POST" | "PUT" | "DELETE";
function fetchAPI<T extends statusResponse>(method: Method, url: string, body?: object) {
  return UserStorage.getUserToken().then(token => {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const options: { method: Method; headers: HeadersInit; body?: string } = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "x-auth": token?.token ?? "",
        "x-timestamp": timestamp,
        "x-sign": sha512(timestamp + token?.privKey) ?? "",
      },
    };

    if (method != "GET") {
      options.body = JSON.stringify(body);
    }

    return fetch(`${constraints.SERVER_URL}${url}`, options).then(res => res.json());
  });
}

function GetAPI<T extends statusResponse = dataResponse>(url: string) {
  return fetchAPI<T>("GET", url);
}
function PostAPI<T extends statusResponse = dataResponse>(url: string, body?: object) {
  return fetchAPI<T>("POST", url, body);
}
function PutAPI<T extends statusResponse = dataResponse>(url: string, body?: object) {
  return fetchAPI<T>("PUT", url, body);
}
function DeleteAPI<T extends statusResponse = dataResponse>(url: string, body?: object) {
  return fetchAPI<T>("DELETE", url, body);
}

export type { dataResponse, statusResponse };
export { DeleteAPI, GetAPI, PostAPI, PutAPI };
