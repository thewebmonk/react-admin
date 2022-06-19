import { deleteRe, get, post } from '../../../common/api-calls/api-client';
import { showErrorModal } from '../../../common/utils';
import { AsyncThunkDispatch, Thunk } from '../../../types/index.types';
import { CreateVideoPayload, Video } from '../videos.type';

export const getAllVideos = (): Thunk<null | Video[]> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | Video[]> => {
    const { auth } = getState();
    let response: null | { data: Video[]; status: number } = null;
    try {
      response = await get('videos', auth.authToken);
      return response.data;
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};

export const createVideo = (payload: CreateVideoPayload): Thunk<null | Video> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | Video> => {
    const { auth } = getState();
    let response: null | { data: Video; status: number } = null;
    try {
      response = await post('video', payload, auth.authToken);
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};

// export const updateUser = (id: any, payload: CreateUserPayload): Thunk<null | User> => {
//   return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | User> => {
//     const { auth } = getState();
//     let response: null | { data: User; status: number } = null;
//     try {
//       response = await put(`user/${id}`, payload, auth.authToken);
//       return response.data;
//     } catch (err: any) {
//       showErrorModal(err, dispatch);
//     }
//     return null;
//   };
// };
export const deleteVideo = (id: any): Thunk<boolean> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<boolean> => {
    const { auth } = getState();
    let response = null;
    try {
      response = await deleteRe(`video/${id}`, {}, auth.authToken);
      if (response.status === 201) {
        return true;
      }
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return false;
  };
};

// export const getUser = (id: any): Thunk<null | User> => {
//   return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | User> => {
//     const { auth } = getState();
//     let response: null | { data: User; status: number } = null;
//     try {
//       response = await get(`user/${id}`, auth.authToken);
//       return response.data;
//     } catch (err: any) {
//       showErrorModal(err, dispatch);
//     }
//     return null;
//   };
// };
