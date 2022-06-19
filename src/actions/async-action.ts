import { get } from '../common/api-calls/api-client';
import { showErrorModal } from '../common/utils';
import { AsyncThunkDispatch, Thunk } from '../types/index.types';
import { logoutUser, setUser } from '../pages/login/actions';
import { User } from '../pages/login/login.types';

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
