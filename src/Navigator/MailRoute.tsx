import Chatroom from "../App/Mail/Chatroom";
import Mail from "../App/Mail/Mail";
import SearchUser from "../App/Mail/SearchUser";
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
];

export type NavigationProp = {
  Mail: undefined;
  Chatroom: { target: number };
  SearchUser: undefined;
};

export default Routes;
