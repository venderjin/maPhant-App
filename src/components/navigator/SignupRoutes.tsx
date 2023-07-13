import Login from "../Member/Login";
import Find from "../Member/Find";
import Signup from "../Member/Signup";
import TermsSet from "../Member/Terms";
import SearchUniversity from "../Member/SearchUniv";
import Confirm from "../Member/Confirm";
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
