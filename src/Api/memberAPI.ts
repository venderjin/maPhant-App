import { dataResponse, GetAPI, PostAPI, statusResponse } from "./fetchAPI";

type RespLogin = {
  pubKey: string;
  privKey: string;
} & statusResponse;
type UserCategory = {
  categoryId: number;
  categoryName: string;
  majorId: number;
  majorName: string;
};
type UserData = {
  id: number;
  email: string;
  name: string;
  nickname: string;
  role: string;
  category: UserCategory[];
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
