import React, { ChangeEvent, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { description } from './../Task/Task.css';
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../store/slices/loggerSlice';
import { modalButtons, modalCloseBtn, modalDeleteBtn, modalHeader, modalHeaderTitle, modalInput, modalTitle, modalUpdateBtn, modalWindow, modalWrapper } from './EditModal.css';

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector(state => state.modal);
  const [data, setData] = useState(editingState);

  // handler
  const handleCloseButton = () =>{
    dispatch(setModalActive(false));
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskName: e.target.value
      }
    })
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskDescription: e.target.value
      }
    })
    
  }
  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>)=> {
    setData({
      ...data,
      task: {
        ...data.task,
        taskOwner: e.target.value
      }
    })
  }
  const handleUpdate = () => {
    dispatch(updateTask({
      boardId: editingState.boardId,
      listId: editingState.listId,
      task: data.task
    }))
    dispatch(addLog({
      logId: uuidv4(),
      logMessage: `Update task : ${editingState.task.taskName}`,
      logAuthor: 'hee',
      logTimeStamp: String(Date.now())
    }))
    dispatch(setModalActive(false));
  }
  const handleDelete = () => {
    dispatch(deleteTask({
      boardId: editingState.boardId,
      listId: editingState.listId,
      taskId: editingState.task.taskId
    }))
    dispatch(addLog({
      logId: uuidv4(),
      logMessage: `Delete task : ${editingState.task.taskName}`,
      logAuthor: 'hee',
      logTimeStamp: String(Date.now())
    }))
    dispatch(setModalActive(false));
  }

  return (
    <div className={modalWrapper}>
      <div className={modalWindow}>
        <div className={modalHeader}>
          <div className={modalHeaderTitle}>{editingState.task.taskName}</div>
          <FiX 
            className={modalCloseBtn}
            onClick={handleCloseButton}
          />
        </div>
        <div className={modalTitle}>제목</div>
        <input 
          className={modalInput}
          type='text'
          value={data.task.taskName}
          onChange={handleNameChange}
          />
        <div className={modalTitle}>설명</div>
        <input 
          className={modalInput}
          type='text'
          value={data.task.taskDescription}
          onChange={handleDescriptionChange}
          />
        <div className={modalTitle}>작성자</div>
        <input 
          className={modalInput}
          type='text'
          value={data.task.taskOwner}
          onChange={handleAuthorChange}
          />
        <div className={modalButtons}>
          <button
            className={modalUpdateBtn}
            onClick={handleUpdate}
            >일 수정하기</button>
          <button
            className={modalDeleteBtn}
            onClick={handleDelete}
          >일 삭제하기</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;