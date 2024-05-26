import React, { FC, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";
import { addButton, addSection, boardItem, boardItemActive, container, title } from "./BoardList.css";
import clsx from "clsx";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({ 
  activeBoardId, 
  setActiveBoardId 
}) => {

  // header 내 게시판 리스트
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const boardCreateInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
    // input이 등록되기 전에 focus를 시도하는 타이밍 문제로 setTimeout 함수 처리
    setTimeout(() => { 
      boardCreateInputRef.current?.focus();
    },0)
  }

  return (
    <div className={container}>
      {/* header 내 게시판 리스트 UI */}
      <div className={title}>게시판:</div>
      {boardArray.map((board, idx) => (
        <div key={board.boardId}
          onClick={()=> setActiveBoardId(boardArray[idx].boardId)}
          className={clsx(
            {[boardItemActive]: boardArray.findIndex(item => item.boardId === activeBoardId) === idx},
            {[boardItem]: boardArray.findIndex(item=> item.boardId === activeBoardId) !== idx}
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      {/* 게시판 추가 버튼 UI */}
      <div className={addSection}>
        {
          isFormOpen ? 
            <SideForm boardCreateInputRef={boardCreateInputRef} setIsFormOpen={setIsFormOpen}></SideForm>
          : <FiPlusCircle className={addButton} onClick={handleClick}/>
        }
      </div>
    </div>
  );
};

export default BoardList;
