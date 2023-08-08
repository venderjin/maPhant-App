import { MessageList, TargetNickId } from "../../types/DM";
import { DeleteAPI, GetAPI, PostAPI, statusResponse } from "../fetchAPI";

function SearchNickname(nickname: string) {
  return GetAPI<{ data: TargetNickId[] } & statusResponse>(`/dm/target/search`, { nickname });
}

function sendContent(receiver_id: number, content: string) {
  return PostAPI(`/dm`, {
    receiver_id,
    content,
  });
}

function receiveChatrooms() {
  return GetAPI<{ data: MessageList[] } & statusResponse>(`/room`);
}

function deleteChat(id: number) {
  return DeleteAPI(`/room/${id}`);
}

function chartLists(id: number | undefined) {
  return GetAPI(`/room/${id}?cursor=0&limit=100`);
}

export { chartLists, deleteChat, receiveChatrooms, SearchNickname, sendContent };
