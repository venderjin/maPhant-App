import Login from "../member/Login";
import Home from "../Home";
import QA from "../Board/QAdetail";
import Alarm from "../Alarm";
import QnABoard from "../../App/Board/QnAList";
import BoardList from "../../App/Board";
import { Component } from "react";
import DetailList from "../../App/Board/List";
import QAdetail from "../Board/QAdetail";
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
    name: "alarm",
    component: Alarm,
  },
  {
    name: "BoardList",
    component: BoardList,
  },
  {
    name: "QnABoard",
    component: QnABoard,
  },
  {
    name: "DetailList",
    component: DetailList,
  },
  {
    name: "detail",
    component: QAdetail,
  },
];

export default Routes;
