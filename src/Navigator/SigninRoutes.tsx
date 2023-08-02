import Find from "../App/Login/Find";
import Login from "../App/Login/Login";
import Confirm from "../App/Signup/Confirm";
import SearchUniversity from "../App/Signup/SearchUniversity";
import Signup from "../App/Signup/Signup";
import TermsSet from "../App/Signup/TermsSet";
import { RouteType } from "../types/Navigation";

const SignupRoutes: RouteType[] = [
  {
    name: "Login",
    component: Login,
    options: {
      headerShown: false,
    },
  },
  {
    name: "find",
    component: Find,
  },
  {
    name: "TermsSet",
    component: TermsSet,
  },
  {
    name: "Signup",
    component: Signup,
  },
  {
    name: "SearchUniversity",
    component: SearchUniversity,
  },
  {
    name: "Confirm",
    component: Confirm,
  },
];

type ConfirmRoute = {
  email: string;
};
type SignInNavigationProp = {
  Login: undefined;
  find: undefined;
  TermsSet: undefined;
  Signup: undefined;
  SearchUniversity: undefined;
  Confirm: ConfirmRoute;
};

export type { ConfirmRoute, SignInNavigationProp };
export default SignupRoutes;
