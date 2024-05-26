// redux를 위한 hooks eg. useSelector =>  / useDispatcher =>
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";

/**
 * TypedUseSelectorHook<RootState> 타입으로 정의해야하는 이유
 * RootState로 값을 반환할 때 {state: {..RootState}} 형태로 만들어주기 위해
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatch>();

// const logger = useTypedSelector(state => state.logger);
