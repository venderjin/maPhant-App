import Login from "../member/Login";
import Find from "../member/Find";
import Signup from "../member/Signup";
import TermsSet from "../member/Terms";
import SearchUniversity from "../member/SearchUniv";
import Confirm from "../member/Confirm";
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
