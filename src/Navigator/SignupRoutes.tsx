import Signup from "../App/Signup/Signup";
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
