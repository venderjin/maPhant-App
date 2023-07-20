import BoardList from "../App/Board/BoardList";
import QnABoard from "../App/Board/QnAList";
import DetailList from "../App/Board/List";
import QAdetail from "../App/Board/QAdetail";
import QA_answer from "../App/Board/QA_answer";

const Routes = [
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
];

export default Routes;
