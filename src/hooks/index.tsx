import React, { useEffect, useState, useContext, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../pages/login/actions/async-action';
import { roles } from '../pages/login/constants';
import { Permission } from '../pages/login/login.types';
import { Dispatch, RootState } from '../types/index.types';
import debounce from 'debounce';
import { isWidthMobile } from '../common/utils';

export const NavContext = createContext<{
  goBackRoute: string;
  setGoBackRoute: React.Dispatch<React.SetStateAction<string>> | null;
}>({ goBackRoute: '', setGoBackRoute: null });

export const useNavContext = () => {
  return useContext(NavContext);
};

export const useIsAuthentciated = () => {
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  if (authToken) {
    return true;
  }
  return false;
};

export const useLogout = () => {
  const dispatch = useDispatch<Dispatch>();
  return () => {
    dispatch(logout());
  };
};

export const usePermission = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (user) {
    const permission: any = { ...user.permission };
    if ([roles.ADMIN, roles.ROOT].includes(user.role)) {
      Object.keys(permission).forEach((prm: string) => {
        permission[prm] = true;
      });
    }
    return permission as Permission;
  }
  return {} as Permission;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = debounce(() => {
    setIsMobile(isWidthMobile(window.screen.width));
  }, 100);
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return isMobile;
};

export const useIsAdmin = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user && user.role && [roles.ADMIN, roles.ROOT].includes(user.role) ? true : false;
};
