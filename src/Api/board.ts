import { DeleteAPI, GetAPI, PostAPI, PutAPI, dataResponse } from "./fetchAPI";

const listArticle = (
  boardType: string,
  sortCriterion: string = "likeCnt",
  page: number = 1,
  pageSize: number = 10,
  category: string = "",
): Promise<dataResponse> =>
  PostAPI<dataResponse>(`/board/main`, {
    category: category,
    boardType: boardType,
    sortCriterion: sortCriterion,
    page: page,
    pageSize: pageSize,
  });

// return GetAPI(`/board/${board_id}?page=${page}`);

function getArticle(board_id: String) {
  return PostAPI(`/board/${board_id}`);
}

function insertLikePost(board_id: String) {
  return GetAPI(`/board/like/${board_id}`);
}

function deleteLikeBoard(board_id: String) {
  return DeleteAPI(`/board/like/${board_id}`);
}

function searchArticle() {
  return GetAPI(`/board/search`);
}

export { listArticle, getArticle, insertLikePost, deleteLikeBoard, searchArticle };
