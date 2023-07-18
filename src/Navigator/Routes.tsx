import HomeRoute from "./HomeRoute";
import BoardRoute from "./BoardRoute";
// ... import all other pages

const Routes = [
  ...HomeRoute,
  ...BoardRoute,

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
