import { logoutUser } from '.';
import { get, post } from '../../../common/api-calls/api-client';
import { showErrorModal } from '../../../common/utils';
import { AsyncThunkDispatch, Thunk } from '../../../types/index.types';
import { LoginPayload } from '../login.types';

export const login = (payload: LoginPayload, onFail: () => void, onSuccess: (data: any) => void): Thunk => {
  return async (dispatch: AsyncThunkDispatch) => {
    let response = null;
    try {
      response = await post('login', payload);
      onSuccess(response.data);
    } catch (err) {
      onFail();
      showErrorModal(err, dispatch);
    }
  };
};

export const logout = (): Thunk => {
  return async (dispatch: AsyncThunkDispatch, getState: any) => {
    const { auth } = getState();
    let response = null;
    try {
      response = await get('logout', auth.authToken);
      dispatch(logoutUser());
    } catch (err) {
      showErrorModal(err, dispatch);
    }
  };
};

export const forgotPassword = (email: string, onSuccess: (data: any) => void): Thunk => {
  return async (dispatch: AsyncThunkDispatch) => {
    let response = null;
    const payload = {
      email
    };
    try {
      response = await post('forgotPassword', payload);
      onSuccess(response.data);
    } catch (err) {
      showErrorModal(err, dispatch);
    }
  };
};

export const resetPassword = (password: string, token: string, onSuccess: (data: any) => void): Thunk => {
  return async (dispatch: AsyncThunkDispatch) => {
    let response = null;
    const payload = {
      token,
      password
    };
    try {
      response = await post('resetPassword', payload);
      onSuccess(response.data);
    } catch (err) {
      showErrorModal(err, dispatch);
    }
  };
};
