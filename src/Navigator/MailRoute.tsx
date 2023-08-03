import Chatroom from "../App/Mail/Chatroom";
import Mail from "../App/Mail/Mail";
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
];

export type NavigationProp = {
  Mail: undefined;
  Chatroom: undefined;
};

export default Routes;
