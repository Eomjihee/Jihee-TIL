import React, { ChangeEvent, FC, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
import { button, buttons, close, input, listForm, taskForm } from './DropDownForm.css'

type TDropDownFormProps = {
  boardId: string;
  isListBtn: boolean;
  listId: string;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDownForm: FC<TDropDownFormProps> = ({
  boardId,
  isListBtn,
  listId,
  setIsFormOpen
}) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState('');
  const formPlaceholder = isListBtn ? "리스트의 제목을 입력하세요" : "일의 제목을 입력하세요";
  const buttonTitle = isListBtn ? "리스트 추가하기" : "일 추가하기";
  const handleTextChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  const handleBtnClick = () => {
    if(text) {
      console.log('[text] : ', text, isListBtn);
      if(isListBtn){
        dispatch(
          addList({
            boardId,
            list: {
              listId: uuidv4(),
              listName: text, 
              tasks: []
            }
          })
        )
        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `Create List : ${text}`,
            logAuthor: 'hee',
            logTimeStamp: String(Date.now())
          })
        )
      }else {
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              taskId: uuidv4(),
              taskName: text, 
              taskDescription: '',
              taskOwner: 'hee'
            }
          })
        )
        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `Create Task : ${text}`,
            logAuthor: 'hee',
            logTimeStamp: String(Date.now())
          })
        )
      }
    }
  }

  return (
    <div className={isListBtn ? listForm : taskForm}>
      <textarea
        className={input}
        autoFocus
        value={text}
        onChange={handleTextChange}
        placeholder={formPlaceholder}
        onBlur={() => setIsFormOpen(false)}
      />
      <div className={buttons}>
        <button
          className={button}
          onMouseDown={handleBtnClick}
        >
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;