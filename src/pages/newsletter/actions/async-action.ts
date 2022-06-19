import { deleteRe, get } from '../../../common/api-calls/api-client';
import { showErrorModal } from '../../../common/utils';
import { AsyncThunkDispatch, Thunk } from '../../../types/index.types';
import { NewsLetterAPI } from '../newsletter.types';

export const getNewsletteEmails = (): Thunk<NewsLetterAPI[] | null> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<NewsLetterAPI[] | null> => {
    const { auth } = getState();
    let response: { data: NewsLetterAPI[]; status: number } | null = null;
    try {
      response = await get('newsletter', auth.authToken);
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    if (response?.status === 200) {
      return response.data;
    }
    return null;
  };
};

export const deleteNewsletteEmails = (paylaod: any[]): Thunk<boolean> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<boolean> => {
    const { auth } = getState();
    let response: { data: NewsLetterAPI[]; status: number } | null = null;
    try {
      response = await deleteRe('newsletter', { ids: paylaod }, auth.authToken);
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    if (response?.status === 201) {
      return true;
    }
    return false;
  };
};
