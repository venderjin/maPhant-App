import HomeRoute from "./HomeRoute";
import BoardRoute from "./BoardRoute";
import SignupRoutes from "./SigninRoutes";
import SigninRoutes from "./SigninRoutes";
import MailRoutes from "./MailRoute";
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
