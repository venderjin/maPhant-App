import { BoardPost, commentType, HotBoard } from "../types/Board";
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

const getArticle = (board_id: number): Promise<dataResponse<BoardPost>> =>
  GetAPI<dataResponse<BoardPost>>(`/board/${board_id}`);

function insertLikePost(board_id: number) {
  return PostAPI(`/board/like/${board_id}`);
}

function deleteLikeBoard(board_id: number) {
  return DeleteAPI(`/board/like/${board_id}`);
}

function searchArticle(content: string, boardType_id: number) {
  return GetAPI(`/board/search?content=${content}&boardTypeId=${boardType_id}`);
}
function bookMarkArticle(board_id: number) {
  return PostAPI(`/bookmark/${board_id}`);
}
function DeletebookMarkArticle(board_id: number) {
  return DeleteAPI(`/bookmark/${board_id}`);
}
const listReportType = (): Promise<dataResponse> => GetAPI<dataResponse>(`/report/list`);
function ReportPost(board_id: number, reportType_id: number) {
  return PostAPI(`/board/report?boardId=${board_id}&reportId=${reportType_id}`, {
    board_id,
    reportType_id,
  });
}
const listSortCriterion = (): Promise<dataResponse> => GetAPI<dataResponse>(`/board/sortCriterion`);

const commentArticle = (
  board_id: number,
  page: number,
  recordSize: number,
): Promise<dataResponse<{ list: commentType[] }>> =>
  GetAPI(`/comment/list/${board_id}?page=${page}&recordSize=${recordSize}`);

const commentInsert = (
  user_id: number,
  board_id: number,
  body: string,
  is_anonymous: number,
): Promise<dataResponse> =>
  PostAPI<dataResponse>(`/comment/insert`, {
    user_id,
    board_id,
    body,
    is_anonymous,
  });

const commentDelete = (id: number): Promise<dataResponse> =>
  DeleteAPI<dataResponse>(`/comment/${id}`);

const commentUpdate = (id: number, body: string): Promise<dataResponse> =>
  PostAPI(`/comment/update`, { id, body });

const commentReply = (
  user_id: number,
  board_id: number,
  parent_id: number,
  body: string,
  is_anonymous: number,
): Promise<dataResponse> =>
  PostAPI<dataResponse>(`/comment/reply`, {
    user_id,
    board_id,
    parent_id,
    body,
    is_anonymous,
  });

const commentLike = (userId: number, commentId: number): Promise<dataResponse> =>
  PostAPI<dataResponse>(`/comment/like`, { userId, commentId });

const commentLikeCnt = (comment_id: number): Promise<dataResponse> =>
  GetAPI<dataResponse>(`/comment/cnt-like/${comment_id}`);

export {
  boardDelete,
  boardEdit,
  boardPost,
  bookMarkArticle,
  commentArticle,
  commentDelete,
  commentInsert,
  commentLike,
  commentLikeCnt,
  commentReply,
  commentUpdate,
  DeletebookMarkArticle,
  deleteLikeBoard,
  getArticle,
  insertLikePost,
  listArticle,
  listBoardType,
  listHotBoard,
  listHotBoardTotal,
  listReportType,
  listSortCriterion,
  ReportPost,
  searchArticle,
};
