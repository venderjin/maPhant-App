import Login from "../member/Login";
import Home from "../Home";
// ... import all other pages

const Routes = [
  {
    name: "home",
    component: Home,
  },
  {
    name: "login",
    component: Login,
  },
];

export default Routes;
