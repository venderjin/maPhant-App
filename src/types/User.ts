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

export type { UserCategory, UserData };
