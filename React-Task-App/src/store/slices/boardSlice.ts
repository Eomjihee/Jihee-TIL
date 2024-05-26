import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "게시판1",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescription: "description",
              taskOwner: "hee",
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescription: "description2",
              taskOwner: "hee",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-2",
              taskName: "Task 3",
              taskDescription: "description3",
              taskOwner: "hee",
            },
          ],
        },
      ],
    },
    {
      boardId: "board-1",
      boardName: "게시판2",
      lists: [
        {
          listId: "list-2",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-3",
              taskName: "Task 4",
              taskDescription: "description4",
              taskOwner: "hee",
            },
            {
              taskId: "task-4",
              taskName: "Task 5",
              taskDescription: "description5",
              taskOwner: "hee",
            },
          ],
        },
        {
          listId: "list-3",
          listName: "List 3",
          tasks: [
            {
              taskId: "task-5",
              taskName: "Task 6",
              taskDescription: "description6",
              taskOwner: "hee",
            },
          ],
        },
      ],
    },
  ],
};

type TAddBoardAction = {
  board: IBoard;
};
type TDeleteBoardAction = {
  boardId: string;
};
type TDeleteListAction = {
  boardId: string;
  listId: string;
};
type TAddListAction = {
  boardId: string;
  list: IList;
};
type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};
type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray = [...state.boardArray, payload.board];
    },
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(board => 
        board.boardId !== payload.boardId
      );
    },
    setModalActive: (state, {payload}: PayloadAction<boolean>) => {
      state.modalActive = payload
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    addList: (state, {payload}: PayloadAction<TAddListAction>) => {
      // state.boardArray.map(board => board.boardId === payload.boardId
      //   ? {...board, lists: board.lists.push(payload.list)}
      //   // ? {...board, lists: [...board.lists, payload.list]}
      //   : board
      // )
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: [...board.lists, payload.list] }
          : board
      );
    },
    addTask: (state, {payload}: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) => 
        board.boardId === payload.boardId
        ? {...board, lists: board.lists.map((list) => 
            list.listId === payload.listId
            ? {...list, tasks : [...list.tasks, payload.task]}
            : list )
          }
        : board
      )
    },
    updateTask: (state, {payload}: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) => 
        board.boardId === payload.boardId
        ? {...board, lists: board.lists.map((list) => 
            list.listId === payload.listId
            ? {...list, tasks : list.tasks.map(task => 
              task.taskId === payload.task.taskId
              ? payload.task
              : task
            )}
            : list )
          }
        : board
      )
    },
    deleteTask: (state,{payload}: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map(board => 
        board.boardId === payload.boardId
        ? {...board, lists: board.lists.map(list => 
          list.listId === payload.listId
          ? {...list, tasks: list.tasks.filter(task => task.taskId !== payload.taskId)}
          :list
        )}
        : board
      )
    }
  },
});

export const { addBoard, deleteBoard, setModalActive, deleteList, addList, addTask, updateTask, deleteTask } = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;
