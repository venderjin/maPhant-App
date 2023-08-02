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

export { listArticle, boardPost, boardEdit, boardDelete };
