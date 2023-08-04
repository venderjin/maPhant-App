import { sha512 } from "js-sha512";

import UIStore from "../storage/UIStore";
import UserStorage from "../storage/UserStorage";
import constraints from "./constraints";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type statusResponse = {
  success: boolean;
  errors?: string;
};
type dataResponse = {
  data?: object;
} & statusResponse;

function fetchAPI<T extends statusResponse>(
  method: Method,
  url: string,
  body?: object,
  showLoadingOverlay?: boolean,
): Promise<T> {
  if (showLoadingOverlay) UIStore.showLoadingOverlay();

  return UserStorage.getUserToken().then(token => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    setTimeout(() => abortController.abort(), 5000);

    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortSignal,
    };
    if (token != undefined) {
      // @ts-expect-error
      options.headers["x-auth"] = token.token;
      // @ts-expect-error
      options.headers["x-timestamp"] = Math.floor(Date.now() / 1000);
      // @ts-expect-error
      options.headers["x-sign"] = sha512(
        // @ts-expect-error
        `${options.headers["x-timestamp"]}${token.privKey}`,
      );
    }

    if (method != "GET") {
      options.body = JSON.stringify(body);
    }

    const url_complete = `${constraints.SERVER_URL}${url}`;

    return fetch(url_complete, options)
      .catch(err => {
        console.warn(method, url_complete, body, err);
        if (err.name && (err.name === "AbortError" || err.name === "TimeoutError")) {
          return Promise.reject("서버와 통신에 실패 했습니다 (Timeout)");
        }

        return Promise.reject("서버와 통신 중 오류가 발생했습니다.");
      })
      .then(res => {
        // 특수 처리 (로그인 실패시에도 401이 들어옴)
        // 로그인의 경우는 바로 내려 보냄
        if (url == "/user/login") {
          return res.json();
        }

        if (res.status === 401) {
          // 로그인 안됨 (unauthorized)
          UserStorage.removeUserData();
          return Promise.reject("로그인 토큰이 만료되었습니다.");
        }

        return res.json();
      })
      .then(json => {
        console.log(url_complete, json);
        const resp = json as T;

        if (json.status !== true && resp.success === false) {
          console.error(method, url_complete, body, resp.errors ?? json.message);
          return Promise.reject(resp.errors ?? json.message);
        }

        return Promise.resolve(resp);
      })
      .finally(() => {
        if (showLoadingOverlay) UIStore.hideLoadingOverlay();
      });
  });
}

function GetAPI<T extends statusResponse = dataResponse>(
  url: string,
  showLoadingOverlay: boolean = false,
) {
  return fetchAPI<T>("GET", url, undefined, showLoadingOverlay);
}
function PostAPI<T extends statusResponse = dataResponse>(
  url: string,
  body?: object,
  showLoadingOverlay: boolean = false,
) {
  return fetchAPI<T>("POST", url, body, showLoadingOverlay);
}
function PutAPI<T extends statusResponse = dataResponse>(
  url: string,
  body?: object,
  showLoadingOverlay: boolean = false,
) {
  return fetchAPI<T>("PUT", url, body, showLoadingOverlay);
}
function DeleteAPI<T extends statusResponse = dataResponse>(
  url: string,
  body?: object,
  showLoadingOverlay: boolean = false,
) {
  return fetchAPI<T>("DELETE", url, body, showLoadingOverlay);
}

export type { dataResponse, statusResponse };
export { DeleteAPI, GetAPI, PostAPI, PutAPI };
