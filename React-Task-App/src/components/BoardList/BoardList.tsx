import React, { FC, useRef, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth"; // 패키지가 "firebase/auth/cordova" 일 경우 오류 발생
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const dispatch = useTypedDispatch();
  // header 내 게시판 리스트
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const boardCreateInputRef = useRef<HTMLInputElement>(null);

  // firebase auth
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // custom hooks
  const { isAuth, email, id } = useAuth();

  // handler
  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    // input이 등록되기 전에 focus를 시도하는 타이밍 문제로 setTimeout 함수 처리
    setTimeout(() => {
      boardCreateInputRef.current?.focus();
    }, 0);
  };
  const handleLogin = () => {
    /**
     * 정상작동 하려면
     * firebase -> Authentication 시작하기
     * -> 추가제공업체 google 선택 -> 사용 설정 on -> 프로젝트 지원 이메일 선택 후 저장
     */
    // login popup 뜨게 하기
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // login 완료시 then에서 처리
        // redux store에 올려줄 것
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `Login`,
            logAuthor: "hee",
            logTimeStamp: String(Date.now()),
          })
        );
      })
      .catch((err) => console.error("[code error] ", err));
  };
  const handleLogout = () => {
    signOut(auth)
    .then(()=> {
      dispatch(
        removeUser()
      )
    })
    .catch(err=> console.error('[code error] ', err))
  }

  return (
    <div className={container}>
      {/* header 내 게시판 리스트 UI */}
      <div className={title}>게시판:</div>
      {boardArray.map((board, idx) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[idx].boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex(
                  (item) => item.boardId === activeBoardId
                ) === idx,
            },
            {
              [boardItem]:
                boardArray.findIndex(
                  (item) => item.boardId === activeBoardId
                ) !== idx,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      {/* 게시판 추가 버튼 UI */}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm
            boardCreateInputRef={boardCreateInputRef}
            setIsFormOpen={setIsFormOpen}
          ></SideForm>
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {
          isAuth
            ? <GoSignOut 
                className={addButton} 
                onClick={handleLogout}
              />
            : <FiLogIn className={addButton} onClick={handleLogin} />
        }
      </div>
    </div>
  );
};

export default BoardList;
