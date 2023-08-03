import Mypage from "../App/Mypage/Mypage";
import PasswordCheck from "../App/Mypage/PasswordCheck";
import ProfileModify from "../App/Mypage/ProfileModify";
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
];

export type NavigationProp = {
  Mypage: undefined;
  PasswordCheck: undefined;
  ProfileModify: undefined;
};

export default Routes;
