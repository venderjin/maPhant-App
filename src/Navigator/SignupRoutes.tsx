import Login from "../App/Login/Login";
import Find from "../App/Login/Find";
import Signup from "../App/Member/Signup";
import TermsSet from "../App/Signup/Terms";
import SearchUniversity from "../App/Signup/SearchUniv";
import Confirm from "../App/Signup/Confirm";
const SignupRoutes = [
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
