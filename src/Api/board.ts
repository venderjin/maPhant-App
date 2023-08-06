import { dataResponse, DeleteAPI, GetAPI, PostAPI, PutAPI } from "./fetchAPI";

const listArticle = (
  boardType_id: number,
  page: number,
  pageSize: number,
  sortCriterion: number,
): Promise<dataResponse> =>
  GetAPI<dataResponse>(
    `/board?boardTypeId=${boardType_id}&page=${page}&pageSize=${pageSize}&sortCriterionId=${sortCriterion}`,
  );

const listBoardType = (): Promise<dataResponse> => GetAPI<dataResponse>(`/board/boardType`);

function boardPost(
  parentId: null | number,
  categoryId: number,
  userId: number,
  typeId: number,
  title: string,
  body: string,
  isHide: 0 | 1,
  isComplete: 0 | 1,
  isAnonymous: 0 | 1,
) {
  return PostAPI(`/board/create`, {
    parentId,
    categoryId,
    userId,
    typeId,
    title,
    body,
    isHide,
    isComplete,
    isAnonymous,
  });
}

function boardEdit(id: number, title: string, body: string, isHide: 0 | 1) {
  return PutAPI(`/board/update`, {
    id,
    title,
    body,
    isHide,
  });
}

function boardDelete() {
  return DeleteAPI(`/board/10`);
}
const getArticle = (board_id: number): Promise<dataResponse> =>
  GetAPI<dataResponse>(`/board/${board_id}`);

function insertLikePost(board_id: string) {
  return GetAPI(`/board/like/${board_id}`);
}

function deleteLikeBoard(board_id: string) {
  return DeleteAPI(`/board/like/${board_id}`);
}

function searchArticle() {
  return GetAPI(`/board/search`);
}

export {
  boardDelete,
  boardEdit,
  boardPost,
  deleteLikeBoard,
  getArticle,
  insertLikePost,
  listArticle,
  listBoardType,
  searchArticle,
};
