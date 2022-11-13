import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { setErrorModal, storeSetting, storeSettings } from '../actions';
import { PageUIStateType } from '../types/index.types';

const initialState: PageUIStateType = {
  errorModal: {
    message: null
  },
  settings: null
};

const pageUIStateReducer = createReducer(initialState, (builder: ActionReducerMapBuilder<PageUIStateType>) => {
  builder.addCase(setErrorModal, (state: typeof initialState, action: ReturnType<typeof setErrorModal>) => {
    state.errorModal.message = action.payload;
  });
  builder.addCase(storeSettings, (state: typeof initialState, action: ReturnType<typeof storeSettings>) => {
    state.settings = action.payload;
  });
  builder.addCase(storeSetting, (state: typeof initialState, action: ReturnType<typeof storeSetting>) => {
    state.settings = { ...state.settings, [action.payload.key]: action.payload.value };
  });
});

export default pageUIStateReducer;
