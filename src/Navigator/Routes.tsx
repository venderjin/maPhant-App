import HomeRoute from "./HomeRoute";
import BoardRoute from "./BoardRoute";
import SignupRoutes from "./SignupRoutes";
import SigninRoutes from "./SigninRoutes";
// ... import all other pages

const Routes = [
  ...HomeRoute,
  ...BoardRoute,
  ...SignupRoutes,
  ...SigninRoutes,
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
