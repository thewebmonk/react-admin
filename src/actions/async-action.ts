import { get, post } from '../common/api-calls/api-client';
import { showErrorModal } from '../common/utils';
import { AsyncThunkDispatch, Settings, SettingsAPI, SettingsAPIResponse, Thunk } from '../types/index.types';
import { logoutUser, setUser } from '../pages/login/actions';
import { User } from '../pages/login/login.types';
import { storeSetting, storeSettings } from '.';

export const getLoggedInUserAndPermission = (onSuccess: () => void): Thunk => {
  return async (dispatch: AsyncThunkDispatch, getState: any) => {
    const { auth } = getState();
    let response = null;
    try {
      response = await get('user', auth.authToken);
      dispatch(setUser(response.data as User));
      onSuccess();
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
  };
};

export const fetchSettings = (): Thunk => {
  return async (dispatch: AsyncThunkDispatch, getState: any) => {
    const { auth } = getState();
    let response: null | { data: SettingsAPIResponse; status: number } = null;
    try {
      response = await get('settings', auth.authToken);
      if (response.status === 200) {
        const data: Settings = {};
        response.data.forEach((setting: SettingsAPI) => {
          data[setting.key] = setting.value;
        });
        dispatch(storeSettings(data));
      }
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
  };
};

export const updateSettings = (key: string, value: string | null): Thunk => {
  return async (dispatch: AsyncThunkDispatch, getState: any) => {
    const { auth } = getState();
    let response: null | { data: SettingsAPI; status: number } = null;
    try {
      response = await post('settings', { key, value }, auth.authToken);
      if (response.status === 201) {
        const data: Settings = {};
        dispatch(storeSetting({ key: response.data.key, value: response.data.value }));
      }
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
  };
};
