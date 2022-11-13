import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer from '../reducer';
import { Action } from 'redux';
import store from '../store';

export type RootState = ReturnType<typeof rootReducer>;
export type Thunk<T = void> = ThunkAction<Promise<T>, RootState, unknown, Action<string>>;
export type AsyncThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
export type Dispatch = typeof store.dispatch;

export type PageUIStateType = {
  errorModal: {
    message: string | null;
  };
  settings?: Settings | null;
};
export type Settings = {
  [key: string]: string | null;
};
export type SettingsAPI = {
  id: number;
  key: string;
  value: string | null;
  created_at: null | string;
  updated_at: null | string;
};
export type SettingsAPIResponse = SettingsAPI[];
