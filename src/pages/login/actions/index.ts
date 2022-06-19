import { createAction } from '@reduxjs/toolkit';
import { Authtoken, User } from '../login.types';

export const setAuthToken = createAction<Authtoken>('SET_AUTH_TOKEN');
export const logoutUser = createAction('LOGOUT_USER');
export const setUser = createAction<User>('SET_USER');
