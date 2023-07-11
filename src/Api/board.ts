import { BoardPost, BoardPostMockup } from "../types/Board";

function listArticle(
  board_id: String,
  page: Number = 1
): Promise<BoardPostMockup[]> {
  const boardData = [
    {
      id: 1,
      board: "자유 게시판",
      title: "HI",
      content: "안녕하세요",
      userName: "김민수",
      created: "20분 전",
      good: 0,
      command: 0,
    },
    {
      id: 2,
      board: "지식 게시판",
      title: "Hello",
      content: "안녕하세요",
      userName: "anjgkwl",
      created: "30분 전",
      good: 2,
      command: 2,
    },
    {
      id: 3,
      board: "Q&A 게시판",
      title: "How are you?",
      content: "안녕하세요",
      userName: "dkanrjsk",
      created: "1시간 전",
      good: 8,
      command: 5,
    },
    {
      id: 4,
      board: "",
      title: "I'm fine, thank you.",
      content: "안녕하세요 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
      userName: "dkanrjsk",
      created: "3시간 전",
      good: 0,
      command: 5,
    },
    {
      id: 5,
      board: "자유 게시판",
      title: "And you?",
      content: "안녕하세요",
      userName: "dkanrjsk",
      created: "2023-06-30",
      good: 8,
      command: 0,
    },
    {
      id: 6,
      board: "자유 게시판",
      title: "Good bye.",
      content: "안녕하세요",
      userName: "dkssud",
      created: "2023-06-30",
      good: 7,
      command: 5,
    },
    {
      id: 7,
      board: "자유 게시판",
      title: "See you tomorrow.",
      content: "안녕하세요",
      userName: "dkanrjsk",
      created: "2023-06-30",
      good: 8,
      command: 5,
    },
  ];

  return Promise.resolve(boardData);
}

export { listArticle };
