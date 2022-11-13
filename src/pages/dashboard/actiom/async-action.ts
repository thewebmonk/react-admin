import moment from 'moment';
import { get } from '../../../common/api-calls/api-client';
import { showErrorModal } from '../../../common/utils';
import { AsyncThunkDispatch, Thunk } from '../../../types/index.types';
import { GraphData, GraphDataAPIResponse } from '../dashboard.types';

export const getAnalyticsGraphData = (entity: string, upto: number): Thunk<null | GraphDataAPIResponse> => {
  return async (dispatch: AsyncThunkDispatch, getState: any): Promise<null | GraphDataAPIResponse> => {
    const { auth } = getState();
    let response: { data: GraphDataAPIResponse; status: number } | null = null;
    try {
      response = await get(`analytic/getGraphData?upto=${upto}&entity=${entity}`, auth.authToken);
      return response.data.map((data: GraphData) => {
        return { ...data, Date: moment(data.Date).format('DD MMM YYYY') };
      });
    } catch (err: any) {
      showErrorModal(err, dispatch);
    }
    return null;
  };
};
