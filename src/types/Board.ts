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
    createdAt: string;
    modifiedAt?: Date;
    commentCnt: number;
    likeCnt: number;
    reportCnt: number;
    imageUrl?: string;
  };
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

type SortType = {
  id: number;
  name: string;
};

export type { BoardArticle, BoardPost, BoardType, SortType };
