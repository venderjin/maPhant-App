import { MessageList, TargetNickId } from "../../types/DM";
import { GetAPI, PostAPI, statusResponse } from "../fetchAPI";

function SearchNickname(nickname: string) {
  return GetAPI<{ data: TargetNickId[] } & statusResponse>(`/dm/target/search`, { nickname });
}

function sendContent(receiver_id: number, content: string) {
  return PostAPI(`/dm`, {
    receiver_id,
    content,
  });
}

function receiveContent() {
  return GetAPI<{ data: MessageList[] } & statusResponse>(`/room`);
}

export { receiveContent, SearchNickname, sendContent };
