import "./App.css";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
  },
  {
    id: "cato",
    name: "Little Cato",
  },
  {
    id: "ejh",
    name: "EJH",
  },
];

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);
  // handler
  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함된다.
    
    // 목적지가 없을 경우 함수 종료
    if(!result.destination) return;
    // 불변성을 지키기 위해 Array.from 또는 spread 연산자 사용하여 새로운 todo Data 생성
    const items = [...characters];
    // 1. 변경시키는 아이템 배열에서 삭제
    // 2. return값으로 지워진 아이템 잡아주기 : splice로 삭제할 요소값 설정 및 const에 반환해준다. (가변성)
    const [reorderdItem] = items.splice(result.source.index, 1);
    // 원하는 자리에 reorderedItem insert
    items.splice(result.destination.index,0,reorderdItem) // .splice(들어갈 index, 삭제할 배열 요소 개수, 들어갈 배열 요소)
    setCharacters(items);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext 
          onDragEnd={handleEnd}
        >
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
