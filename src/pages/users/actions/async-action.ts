import { deleteRe, get, post, put } from '../../../common/api-calls/api-client';
import { showErrorModal } from '../../../common/utils';
import { AsyncThunkDispatch, Thunk } from '../../../types/index.types';
import { User } from '../../login/login.types';
import { CreateUserPayload } from '../users.types';

export const getAllUsers = (): Thunk<null | User[]> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | User[]> => {
    const { auth } = getState();
    let response: null | { data: User[]; status: number } = null;
    try {
      response = await get('users', auth.authToken);
      return response.data;
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};

export const createUser = (payload: CreateUserPayload): Thunk<null | User> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | User> => {
    const { auth } = getState();
    let response: null | { data: User; status: number } = null;
    try {
      response = await post('users', payload, auth.authToken);
      return response.data;
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};

export const updateUser = (id: any, payload: CreateUserPayload): Thunk<null | User> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | User> => {
    const { auth } = getState();
    let response: null | { data: User; status: number } = null;
    try {
      response = await put(`user/${id}`, payload, auth.authToken);
      return response.data;
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};
export const deleteUser = (id: any): Thunk<null | boolean> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | boolean> => {
    const { auth } = getState();
    let response: null | { data: User; status: number } = null;
    try {
      response = await deleteRe(`user/${id}`, {}, auth.authToken);
      if (response.status === 200) {
        return true;
      }
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};

export const getUser = (id: any): Thunk<null | User> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | User> => {
    const { auth } = getState();
    let response: null | { data: User; status: number } = null;
    try {
      response = await get(`user/${id}`, auth.authToken);
      return response.data;
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};
