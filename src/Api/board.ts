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

export { listArticle };
