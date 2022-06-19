import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';
import { setErrorModal } from '../../actions';
import { getSideBar, SideBarNavItems, SideBarNavItemType } from '../../pages/commom/utils/utils';
import { logoutUser } from '../../pages/login/actions';
import { roles } from '../../pages/login/constants';
import { Permission, User } from '../../pages/login/login.types';
import { AsyncThunkDispatch } from '../../types/index.types';
import { mobileWidth } from './constants';
import humanize from 'humanize-plus';

export const showErrorModal = (error: any, dispatch: AsyncThunkDispatch) => {
  if (error.response) {
    let logout = false;
    if (error.response?.status === 401) {
      logout = true;
    }
    if (error.response.data && error.response.data.message) {
      dispatch(setErrorModal(error.response.data.message || null));
    }
    if (logout) {
      setTimeout(() => {
        dispatch(logoutUser());
      }, 3000);
    }
  }
};

export const getFirstApplicablePage = (permission: any, isAdmin: boolean) => {
  const applicableTabs = getSideBar(permission, isAdmin);
  return applicableTabs[0].route;
};

export const isWidthMobile = (width: number) => {
  return width <= mobileWidth;
};
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const openNotification = (obj: ArgsProps) => {
  notification.open({
    ...obj,
    placement: 'bottomLeft'
  });
};

export const humanizeHumber = (number: number) => {
  return humanize.compactInteger(number, 2);
};
