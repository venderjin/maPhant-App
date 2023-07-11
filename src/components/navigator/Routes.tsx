import Login from "../member/Login";
import Home from "../Home";
import QA from "../board/QA";
import { Component } from "react";
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
  {
    name: "qa",
    component: QA,
  },
];

export default Routes;
