import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { setErrorModal } from '../actions';

export type PageUIStateType = {
  errorModal: {
    message: string | null;
  };
};
const initialState: PageUIStateType = {
  errorModal: {
    message: null
  }
};

const pageUIStateReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<PageUIStateType>) => {
  builder.addCase(setErrorModal, (state: typeof initialState, action: ReturnType<typeof setErrorModal>) => {
    state.errorModal.message = action.payload;
  });
});

export default pageUIStateReducer;
