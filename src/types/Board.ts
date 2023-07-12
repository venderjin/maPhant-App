type BoardPost = {
  id: number;
  parent_id: number;
  category_id: number;
  user_id: number;
  type: string;
  title: string;
  body: string;
  cnt_recommends: number;
  cnt_report: number;
  state: string;
  is_anonymous: boolean;
  created_at: Date;
  modified_at: Date;
};
type BoardPostMockup = {
  id: number;
  board: string;
  title: string;
  content: string;
  userName: string;
  created: string;
  good: number;
  commant: number;
};

export type { BoardPost, BoardPostMockup };
