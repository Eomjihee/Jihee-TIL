import React, { ChangeEvent, FC, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardCreateInputRef: React.RefObject<HTMLInputElement>;
};

const SideForm: FC<TSideFormProps> = ({
  setIsFormOpen,
  boardCreateInputRef,
}) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleOnBlur = () => {
    setIsFormOpen(false);
  };
  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: {
            boardId: uuidv4(),
            boardName: inputText,
            lists: [],
          },
        })
      );
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `Create Board : ${inputText}`,
          logAuthor: `User`,
          logTimeStamp: String(Date.now()),
        })
      );
    }
  };
  return (
    <div className={sideForm}>
      <input
        ref={boardCreateInputRef}
        // 실제로 사용할 때는 ref={} 대신 autoFocus 처리
        className={input}
        type="text"
        placeholder="게시판 생성"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};

export default SideForm;
