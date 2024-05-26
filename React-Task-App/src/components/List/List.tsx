import React, { FC, useEffect, useState } from "react";
import { IList, ITask } from "../../types";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/DropDownForm/ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  // 현재 DnD가 Strict Mode에서 정상작동하지 않는 오류가 있어 사용
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

type TListProps = {
  list: IList;
  boardId: string;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  // store 값을 변경해주기 위해 dispatch 사용
  const dispatch = useTypedDispatch();
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({boardId, listId}));
    addLog({
      logId: uuidv4(),
      logMessage: `Delete List: ${list.listName}`,
      logAuthor: 'hee',
      logTimeStamp: String(Date.now())
    })
  }
  const handleTaskChange = (
    boardId: string, 
    listId: string, 
    taskId: string,
    task: ITask
  ) => {
    dispatch(setModalData({
      boardId,
      listId,
      task
    }));
    dispatch(setModalActive(true));
  }

  return (
    // droppableId 필수
    <StrictModeDroppable droppableId={list.listId}>
      {provided => (
        <div
          className={listWrapper}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            {/* icon: - */}
            <GrSubtract 
              className={deleteButton}
              onClick={()=> handleListDelete(list.listId)}
            />
          </div>
          {
            list.tasks.map((task, idx) => (
              <div
                key={task.taskId}
                onClick={()=> handleTaskChange(boardId, list.listId, task.taskId, task)}
              >
                <Task 
                  taskName={task.taskName}
                  taskDescription={task.taskDescription}
                  boardId={boardId}
                  id={task.taskId}
                  // dnd를 위해 필요
                  idx={idx}
                />
              </div>
            ))
          }
          {provided.placeholder} {/* DnD 기능을 자연스럽게 해주기 위해 공간 마련용 */}
          <ActionButton 
            boardId={boardId}
            listId={list.listId}
          />
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default List;
