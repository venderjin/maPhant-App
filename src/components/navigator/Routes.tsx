import Login from "../member/Login";
import Home from "../Home";
import QA from "../board/QA";
import QA_answer from "../board/QA_answer";
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
  {
    name: "qa_answer",
    component: QA_answer,
  },
];

export default Routes;
