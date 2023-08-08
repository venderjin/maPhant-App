import { HotBoard } from "../types/Board";
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
  isHide: number,
  isComplete: 0 | 1,
  isAnonymous: number,
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

const listHotBoardTotal = (page: number, recordSize: number): Promise<dataResponse> =>
  GetAPI(`/board/hot?page=${page}&recordSize=${recordSize}`);

const listHotBoard = (
  boardType_id: number,
  page: number,
  recordSize: number,
): Promise<dataResponse<{ list: HotBoard[] }>> =>
  GetAPI(`/board/hot?boardTypeId=${boardType_id}&page=${page}&recordSize=${recordSize}`);

function boardEdit(id: number, title: string, body: string, isHide: number) {
  return PutAPI(`/board/update`, {
    id,
    title,
    body,
    isHide,
  });
}

const boardDelete = (board_id: number): Promise<dataResponse> =>
  DeleteAPI<dataResponse>(`/board/${board_id}`);

const getArticle = (board_id: number): Promise<dataResponse> =>
  GetAPI<dataResponse>(`/board/${board_id}`);

function insertLikePost(board_id: string) {
  return GetAPI(`/board/like/${board_id}`);
}

function deleteLikeBoard(board_id: string) {
  return DeleteAPI(`/board/like/${board_id}`);
}

function searchArticle(content: string, boardType_id: number) {
  return GetAPI(`/board/search?content=${content}&boardTypeId=${boardType_id}`);
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
  listHotBoard,
  listHotBoardTotal,
  searchArticle,
};
