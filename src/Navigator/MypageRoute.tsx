import QAdetail from "../App/Board/QAdetail";
import Bookmark from "../App/Mypage/Bookmark";
import Mycomment from "../App/Mypage/Mycomment";
import Mypage from "../App/Mypage/Mypage";
import Mypost from "../App/Mypage/Mypost";
import PasswordCheck from "../App/Mypage/PasswordCheck";
import Profile from "../App/Mypage/Profile";
import ProfileModify from "../App/Mypage/ProfileModify";
import WriteBoard from "../App/Mypage/WriteBoard";
import WriteContent from "../App/Mypage/WriteContent";
import LikeContent from "../App/Mypage/LikeContent";
import { BoardArticle } from "../types/Board";
import { RouteType } from "../types/Navigation";

const Routes: RouteType[] = [
  {
    name: "Mypage",
    component: Mypage,
  },
  {
    name: "PasswordCheck",
    component: PasswordCheck,
  },
  {
    name: "ProfileModify",
    component: ProfileModify,
  },
  {
    name: "Mypost",
    component: Mypost,
  },
  {
    name: "detail",
    component: QAdetail,
  },
  {
    name: "Bookmark",
    component: Bookmark,
  },
  {
    name: "Mycomment",
    component: Mycomment,
  },
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "WriteBoard",
    component: WriteBoard,
  },
  {
    name: "WriteContent",
    component: WriteContent,
  },
  {
    name: "LikeContent",
    component: LikeContent,
  },
];

export type NavigationProp = {
  Mypage: undefined;
  PasswordCheck: undefined;
  ProfileModify: undefined;
  Mypost: BoardArticle[];
  detail: BoardArticle;
  Bookmark: undefined;
  WriteBoard: undefined;
  WriteContent: undefined;
  LikeContent: undefined;
};

export default Routes;
