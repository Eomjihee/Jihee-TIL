import React, { FC } from 'react';
import { container, description, title } from './Task.css';

type TTaskProps = {
  idx: number;
  id: string;
  boardId: string;
  taskName: string;
  taskDescription: string;
}
const Task: FC<TTaskProps> = ({
  idx,
  id,
  boardId,
  taskName,
  taskDescription
}) => {
  return (
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={description}>{taskDescription}</div>
    </div>
  );
};

export default Task;