import { createAction } from '@reduxjs/toolkit';
import { Settings } from '../types/index.types';

export const setErrorModal = createAction<string | null>('SHOW_ERROR_MODAL');
export const storeSettings = createAction<Settings | null>('STORE_SETTINGS');
export const storeSetting = createAction<{ key: string; value: string | null }>('STORE_SETTING');
