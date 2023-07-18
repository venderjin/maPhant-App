import Login from "../App/Member/Login";
import Find from "../App/Member/Find";
import Signup from "../App/Member/Signup";
import TermsSet from "../App/Member/Terms";
import SearchUniversity from "../App/Member/SearchUniv";
import Confirm from "../App/Member/Confirm";

const SignupRoutes = [
  {
    name: "Signin",
    component: Login,
  },
  {
    name: "find",
    component: Find,
  },
  {
    name: "Signup",
    component: Signup,
  },
  {
    name: "TermsSet",
    component: TermsSet,
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

export default SignupRoutes;
