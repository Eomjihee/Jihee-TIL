import React, { FC } from "react";
import { IList } from "../../types";
import List from "../List/List";
import ActionButton from "../ActionButton/DropDownForm/ActionButton";
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
