import { FC } from "react";
import { IList } from "../../types";
import ActionButton from "../ActionButton/DropDownForm/ActionButton";
import List from "../List/List";
import { listsContainer } from "./ListsContainer.css";

type TListContainerProps = {
  boardId: string;
  lists: IList[];
};

const ListsContainer: FC<TListContainerProps> = ({ lists, boardId }) => {
  return (
    <div className={listsContainer}>
      {
        lists.map(list=> (
          <List key={list.listId} list={list} boardId={boardId}/>
        ))
      }
      <ActionButton 
        boardId={boardId}
        listId={""}
        // btnType={'list'}
        isListBtn
      />
    </div>
  );
};

export default ListsContainer;
