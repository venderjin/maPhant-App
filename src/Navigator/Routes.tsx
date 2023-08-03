import { NavigationProp } from "@react-navigation/native";

import { RouteType } from "../types/Navigation";
import BoardRoute, { NavigationProp as BoardProps } from "./BoardRoute";
import HomeRoute, { NavigationProp as HomeProps } from "./HomeRoute";
import MailRoutes, { NavigationProp as MailProps } from "./MailRoute";
import MypageRoutes, { NavigationProp as MypageProps } from "./MypageRoute";
import SigninRoutes, { SignInNavigationParams } from "./SigninRoutes";
// ... import all other pages

const Routes: RouteType[] = [
  ...HomeRoute,
  ...BoardRoute,
  ...SigninRoutes,
  ...MailRoutes,
  ...MypageRoutes,
];

export type NavigationProps = NavigationProp<
  HomeProps & BoardProps & SignInNavigationParams & MailProps & MypageProps
>;

export default Routes;
