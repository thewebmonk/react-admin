import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer from '../reducer';
import { Action } from 'redux';
import store from '../store';

export type RootState = ReturnType<typeof rootReducer>;
export type Thunk<T = void> = ThunkAction<Promise<T>, RootState, unknown, Action<string>>;
export type AsyncThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
export type Dispatch = typeof store.dispatch;
