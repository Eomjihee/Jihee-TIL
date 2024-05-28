import { FC, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { listButton, taskButton } from './ActionButton.css';
import DropDownForm from './DropDownForm';

type TActionButtonProps = {
  boardId: string;
  listId: string;
  // btnType?: string; 
  isListBtn?: boolean
}
// type TBtnObj = {
//   btnText: string;
//   btnFunc: ()=>{};
// }
// const setBtnObj: TBtnObj = (btnType: string) => {
//   switch (btnType) {
//     case 'list':
//       return {btnText: '새로운 리스트 등록', btnFunc: ()=> {}}
//     default:
//       return {btnText: '', btnFunc: () =>{}};
//   }
// }

const ActionButton: FC<TActionButtonProps>= ({
  boardId,
  listId,
  // btnType,
  isListBtn
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const btnObj = setBtnObj(btnType);
  const buttonText = isListBtn ? '새로운 리스트 등록' : '새로운 일 등록';

  return isFormOpen ? (
    <DropDownForm 
      setIsFormOpen={setIsFormOpen}
      isListBtn={isListBtn ? true : false}
      boardId={boardId}
      listId={listId}
    />
  ):
  (
    <div 
      className={isListBtn ? listButton : taskButton}
      onClick={() => setIsFormOpen(true)}
    >
      {/* icon: + */}
      <IoIosAdd />
      <p>{buttonText}</p>
    </div>
  )
  ;
};

export default ActionButton;