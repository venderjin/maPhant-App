import Mypage from "../App/Mypage/Mypage";
import ProfileModify from "../App/Mypage/ProfileModify";
import { RouteType } from "../types/Navigation";

const Routes: RouteType[] = [
  {
    name: "Mypage",
    component: Mypage,
  },
  {
    name: "ProfileModify",
    component: ProfileModify,
  },
];

export type NavigationProp = {
  Mypage: undefined;
  ProfileModify: undefined;
};

export default Routes;
