import { dataResponse, GetAPI, PostAPI, statusResponse } from "./fetchAPI";

type RespLogin = {
  pubKey: string;
  privKey: string;
} & statusResponse;
type UserData = {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  role: string;
  categoryId: number;
  majorId: number;
};
type UserDataResp = {
  data: UserData;
} & dataResponse;

class UserAPI {
  static async login(email: string, password: string) {
    return PostAPI<RespLogin>("/user/login", { email, password });
  }
  static async getProfile() {
    return GetAPI<UserDataResp>("/user/");
  }
  static async listUniversity() {
    return PostAPI<dataResponse>("/user/universitylist");
  }
}

export default UserAPI;
export type { UserData };
