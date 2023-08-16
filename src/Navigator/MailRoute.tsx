import Chatroom from "../App/Mail/Chatroom";
import Mail from "../App/Mail/Mail";
import SearchUser from "../App/Mail/SearchUser";
import Profile from "../App/Mypage/Profile";
import { TargetNickId } from "../types/DM";
import { RouteType } from "../types/Navigation";

const Routes: RouteType[] = [
  {
    name: "Mail",
    component: Mail,
  },
  {
    name: "Chatroom",
    component: Chatroom,
  },
  {
    name: "SearchUser",
    component: SearchUser,
  },
  {
    name: "Profile",
    component: Profile,
  },
];

export type NavigationProp = {
  Mail: undefined;
  Chatroom: TargetNickId;
  SearchUser: undefined;
};

export type { TargetNickId as MailFormParams };
export default Routes;
