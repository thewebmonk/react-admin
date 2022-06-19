import { createAction } from '@reduxjs/toolkit';

export const setErrorModal = createAction<string | null>('SHOW_ERROR_MODAL');
