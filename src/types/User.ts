type UserCategory = {
  categoryId: number;
  categoryName: string;
  majorId: number;
  majorName: string;
};

type UserData = {
  id: number;
  email: string;
  name: string;
  nickname: string;
  role: string;
  category: UserCategory[];
};

// 상대방 소개글, 프로필 이미지, 닉네임
type OtherUserData = {
  body: string;
  profile_img: string[];
  user_nickname: string;
};

type OtherUserId = {
  id: number;
};

type WriteBoardList = {
  body: string;
  category_id: number;
  comment_cnt: number;
  created_at: Date;
  id: number;
  images_url: string[];
  isLike: boolean;
  is_anonymous: boolean;
  is_complete: boolean;
  is_hide: number;
  like_cnt: number;
  modified_at: string;
  report_cnt: number;
  title: string;
  type: string;
  user_id: number;
};

type Pagination = {
  endPage: number;
  existNextPage: boolean;
  existPrevPage: boolean;
  limitStart: number;
  startPage: number;
  totalPageCount: number;
  totalRecordCount: number;
};
export type { WriteBoardList, OtherUserData, OtherUserId, UserCategory, UserData, Pagination };
