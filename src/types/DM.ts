type TargetNickId = {
  id: number;
  nickname: string;
};
type MessageList = {
  id: number;
  last_content: string;
  other_id: number;
  other_nickname: string;
  receiver_id: number;
  receiver_is_deleted: boolean;
  sender_id: number;
  sender_is_deleted: boolean;
  time: Date;
  unread_count: number;
};

export type { MessageList, TargetNickId };
