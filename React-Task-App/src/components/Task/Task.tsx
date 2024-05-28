import { FC } from 'react';
import { container, description, title } from './Task.css';
// import { Draggable } from 'react-beautiful-dnd';
import { Draggable } from '@hello-pangea/dnd';

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
  taskName,
  taskDescription
}) => {
  return (
    // draggableId, index 필수
    <Draggable draggableId={id} index={idx}>
      {provided => (
        <div 
          className={container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;