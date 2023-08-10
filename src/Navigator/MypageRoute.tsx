import QAdetail from "../App/Board/QAdetail";
import Bookmark from "../App/Mypage/Bookmark";
import Mypage from "../App/Mypage/Mypage";
import Mypost from "../App/Mypage/Mypost";
import PasswordCheck from "../App/Mypage/PasswordCheck";
import ProfileModify from "../App/Mypage/ProfileModify";
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
];

export type NavigationProp = {
  Mypage: undefined;
  PasswordCheck: undefined;
  ProfileModify: undefined;
  Mypost: BoardArticle[];
  detail: BoardArticle;
  Bookmark: undefined;
};

export default Routes;
