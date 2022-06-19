import { post } from '../../../common/api-calls/api-client';
import { showErrorModal } from '../../../common/utils';
import { AsyncThunkDispatch, Thunk } from '../../../types/index.types';

export const updatePassword = (password: string, newPassword: string): Thunk<boolean> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<boolean> => {
    const { auth } = getState();
    let response = null;
    try {
      response = await post('updatePassword', { password, newPassword }, auth.authToken);
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    if (response?.status === 201) {
      return true;
    }
    return false;
  };
};
