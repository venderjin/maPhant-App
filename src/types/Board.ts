type BoardPost = {
  id: number;
  parent_id: number;
  category_id: number;
  user_id: number;
  type_id: string;
  title: string;
  body: string;
  state: string;
  is_hide: number;
  is_complete: number;
  is_anonymous: number;
  created_at: Date;
  modified_at: Date;
  comment_cnt: number;
  like_cnt: number;
  report_cnt: number;
  image_url: string;
};

type BoardArticle = {
  boardId: number;
  title: string;
  createdAt: string;
  modifiedAt: string;
  userNickname: string;
  commentCnt: number;
  likeCnt: number;
  isAnonymous: number;
  isHide: number;
  isLike: number | null;
};

type BoardType = {
  id: number;
  name: string;
  postCnt: number;
};
// type BoardType =
//   | "자유 게시판"
//   | "지식 게시판"
//   | "QnA 게시판"
//   | "취업 / 진로 게시판"
//   | "취미 게시판"
//   | "홍보 게시판"
//   | "익명 게시판";

// type SortType = "created_at" | "like_cnt";

export type { BoardArticle, BoardPost, BoardType };
