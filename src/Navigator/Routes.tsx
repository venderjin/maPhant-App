import BoardRoute from "./BoardRoute";
import HomeRoute from "./HomeRoute";
import MailRoutes from "./MailRoute";
import SignupRoutes from "./SigninRoutes";
import SigninRoutes from "./SigninRoutes";
// ... import all other pages

const Routes = [
  ...HomeRoute,
  ...BoardRoute,
  ...SigninRoutes,
  ...MailRoutes,
  ...SignupRoutes,
  // {
  //   name: "login",
  //   component: Login,
  // },
  // {
  //   name: "alarm",
  //   component: Alarm,
  // },
];

export default Routes;
