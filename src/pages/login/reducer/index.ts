import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { logoutUser, setAuthToken, setUser } from '../actions';
import { Auth } from '../login.types';

const initializeAuthFromLocalStorage = () => {
  const auth: Auth = {
    authToken: null,
    user: null,
    permission: null
  };
  const authTokenTime = localStorage.getItem('authTokenExpireTime');
  if (authTokenTime && new Date(authTokenTime) > new Date(Date.now())) {
    const user = localStorage.getItem('user');
    const permission = localStorage.getItem('permission');
    const authToken = localStorage.getItem('authToken');
    auth.user = JSON.parse(user || '{}');
    auth.permission = JSON.parse(permission || '{}');
    auth.authToken = authToken;
    return auth;
  }
  return null;
};

const initialAuthState = initializeAuthFromLocalStorage();

const initiaState: Auth = {
  authToken: (initialAuthState && initialAuthState.authToken) || '',
  user: (initialAuthState && initialAuthState.user) || null,
  permission: (initialAuthState && initialAuthState.permission) || null
};

const loginReducer = createReducer(initiaState, (builder: ActionReducerMapBuilder<typeof initiaState>) => {
  builder
    .addCase(setAuthToken, (state: typeof initiaState, action: ReturnType<typeof setAuthToken>) => {
      const authToken = action.payload.authToken.split('|')[1];
      state.authToken = authToken;
      state.user = action.payload.user;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('authTokenExpireTime', action.payload.expiresIn);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    })
    .addCase(logoutUser, (state: typeof initiaState) => {
      state.authToken = null;
      state.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpireTime');
      localStorage.removeItem('user');
    })
    .addCase(setUser, (state: typeof initiaState, action: ReturnType<typeof setUser>) => {
      state.user = action.payload;
      state.permission = action.payload.permission;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
});

export default loginReducer;
