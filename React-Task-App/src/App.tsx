import { useState } from "react";
import {
  appContainer,
  board,
  buttons,
  deleteBoardBtn,
  loggerBtn,
} from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { deleteBoard, sortTask } from "./store/slices/boardSlice";
import { addLog } from "./store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
// import { DragDropContext} from 'react-beautiful-dnd';
import { DragDropContext} from '@hello-pangea/dnd';

function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);
  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const lists = getActiveBoard.lists;
  // handler
  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `Delete Board ${getActiveBoard.boardName}`,
          logAuthor: "hee",
          logTimeStamp: String(Date.now()),
        })
      );
      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId
        );
        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };
      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert("게시판이 1개일 때는 삭제할 수 없습니다.");
    }
  };
  const handleDragEnd = (dragTask) => {
    const {destination, source, draggableId} = dragTask;
    const sourceList = lists.filter(list => list.listId === source.droppableId)[0];
    // task를 옮기기 위해 Redux Store에 있는 state를 변경해야함
    dispatch(sortTask({
      boardIndex: boards.findIndex(board => board.boardId === activeBoardId),
      droppableIdStart: source.droppableId, // 옮길 리스트 아이디
      droppableIdEnd: destination.droppableId, // 옮겨질 리스트 아이디
      droppableIndexStart: source.index, // 옮길 리스트의 배열 순번 아이디
      droppableIndexEnd: destination.index, // 옮겨질 리스트의 배열 순번 아이디
      draggableId // 옮길 태스크 아이디
    }))
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `
          DnD Task ${sourceList.tasks.filter(task=> task.taskId === draggableId)[0].taskName}
          From List [${sourceList.listName}] To List [${lists.filter(list => list.listId === destination.droppableId)[0].listName}]
        `,
        logAuthor: "hee",
        logTimeStamp: String(Date.now()),
      })
    );
  }

  return (
    <div className={appContainer}>
      {/* modal Active */}
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      {/* Board Start */}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      {/* Board End */}
      <div className={board}>
        {/*DragDropContext: onDragEnd 필수 할당 */}
        <DragDropContext onDragEnd={handleDragEnd}>
        {/* List Start*/}
        <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        {/* List End*/}
        </DragDropContext>
      </div>
      <div className={buttons}>
        <button className={deleteBoardBtn} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerBtn}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  );
}

export default App;
