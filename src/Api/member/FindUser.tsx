import { INickname } from "../../types/SearchUser";
import { GetAPI } from "../fetchAPI";

function SearchNickname(form: INickname) {
  return GetAPI(`/dm/target/search?nickname=${form}`);
}

export { SearchNickname };
