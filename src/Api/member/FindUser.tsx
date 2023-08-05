import { TargetNickId } from "../../types/DM";
import { GetAPI, statusResponse } from "../fetchAPI";

function SearchNickname(nickname: string) {
  return GetAPI<{ data: TargetNickId[] } & statusResponse>(`/dm/target/search`, { nickname });
}

export { SearchNickname };
