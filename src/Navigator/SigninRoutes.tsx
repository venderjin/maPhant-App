import Login from "../App/Login/Login";
import Find from "../App/Login/Find";
import TermsSet from "../App/Signup/TermsSet";
import Signup from "../App/Signup/Signup";
import SearchUniversity from "../App/Signup/SearchUniversity";
import Confirm from "../App/Signup/Confirm";
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
