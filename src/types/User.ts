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

export type { OtherUserData, UserCategory, UserData };
