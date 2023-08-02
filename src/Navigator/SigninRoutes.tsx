import Find from "../App/Login/Find";
import Login from "../App/Login/Login";
import Confirm from "../App/Signup/Confirm";
import SearchUniversity from "../App/Signup/SearchUniversity";
import Signup from "../App/Signup/Signup";
import TermsSet from "../App/Signup/TermsSet";
const SignupRoutes = [
  {
    name: "Login",
    component: Login,
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

export default SignupRoutes;
