import { PostAPI } from "../fetchAPI";

const sendFcm = (token: string) => {
  return PostAPI(`/fcm/token`, {
    token,
  });
};
export { sendFcm };
