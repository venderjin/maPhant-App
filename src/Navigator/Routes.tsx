import { NavigationProp } from "@react-navigation/native";

import { RouteType } from "../types/Navigation";
import BoardRoute, { NavigationProp as BoardProps } from "./BoardRoute";
import HomeRoute, { NavigationProp as HomeProps } from "./HomeRoute";
import MailRoutes, { NavigationProp as MailProps } from "./MailRoute";
import SigninRoutes, { SignInNavigationParams } from "./SigninRoutes";
// ... import all other pages

const Routes: RouteType[] = [...HomeRoute, ...BoardRoute, ...SigninRoutes, ...MailRoutes];

export type NavigationProps = NavigationProp<
  HomeProps & BoardProps & SignInNavigationParams & MailProps
>;

export default Routes;
