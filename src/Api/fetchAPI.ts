import constraints from "./constraints";

type Method = "GET" | "POST" | "PUT" | "DELETE";
function fetchAPI(method: Method, url: string, body?: JSON) {
  const options: { method: Method; headers: HeadersInit; body?: string } = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method != "GET") {
    options.body = JSON.stringify(body);
  }

  return fetch(`${constraints.SERVER_URL}/${url}`, options).then(res => res.json());
}

function GetAPI(url: string) {
  return fetchAPI("GET", url);
}
function PostAPI(url: string, body?: JSON) {
  return fetchAPI("POST", url, body);
}
function PutAPI(url: string, body?: JSON) {
  return fetchAPI("PUT", url, body);
}
function DeleteAPI(url: string, body?: JSON) {
  return fetchAPI("DELETE", url, body);
}

export { DeleteAPI, GetAPI, PostAPI, PutAPI };
