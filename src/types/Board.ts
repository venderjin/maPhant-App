type BoardPost = {
  board: {
    id: number;
    parentId: number;
    categoryId: number;
    userId: number;
    typeId: string;
    title: string;
    body: string;
    state: string;
    isHide: number;
    isComplete: number;
    isAnonymous: number;
    createdAt: Date;
    modifiedAt?: Date;
    commentCnt: number;
    likeCnt: number;
    reportCnt: number;
    imageUrl?: string;
    isLike: boolean;
  };
  answerList?: {
    id: number;
    parentId: number;
    categoryId: number;
    userId: number;
    typeId: string;
    title: string;
    body: string;
    state: string;
    isHide: number;
    isComplete: number;
    isAnonymous: number;
    createdAt: Date;
    modifiedAt?: Date;
    commentCnt: number;
    likeCnt: number;
    reportCnt: number;
    imageUrl?: string;
  };
};

type BoardArticle = {
  type: string;
  created_at: string;
  boardId: number;
  title: string;
  createdAt: Date;
  modifiedAt: Date;
  userNickname: string;
  commentCnt: number;
  likeCnt: number;
  isAnonymous: number;
  isHide: number;
  isLike: number | null;
};

type HotBoard = {
  boardId: number;
  title: string;
  userId: number;
  userNickname: string;
  typeId: number;
  type: string;
  commentCnt: number;
  likeCnt: number;
  isAnonymous: number;
  isHide: number;
  isLike?: boolean;
  createdAt: Date;
  modifiedAt?: Date;
};

type BoardType = {
  id: number;
  name: string;
  postCnt: number;
};

type SortType = {
  id: number;
  name: string;
};

export type { BoardArticle, BoardPost, BoardType, HotBoard, SortType };
