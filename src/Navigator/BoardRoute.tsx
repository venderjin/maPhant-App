import BoardList, { BoardType } from "../App/Board/BoardList";
import DetailList from "../App/Board/List";
import Post from "../App/Board/Post";
import QA_answer from "../App/Board/QA_answer";
import QAdetail from "../App/Board/QAdetail";
import QnABoard from "../App/Board/QnAList";
import { RouteType } from "../types/Navigation";

const Routes: RouteType[] = [
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
  {
    name: "qa_answer",
    component: QA_answer,
  },
  {
    name: "post",
    component: Post,
  },
];

export type NavigationProp = {
  BoardList: undefined;
  QnABoard: undefined;
  DetailList: { boardType: BoardType };
  detail: undefined;
  qa_answer: undefined;
  Post: undefined;
};

export default Routes;
