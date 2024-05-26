// redux 사용할 때 redux store를 만들어줘야하는데 여기에서 만들게 됨
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";
import { useSelector } from 'react-redux';

const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// const logger = useSelector((state: RootState)=> state.logger);


export default store;
