import { ReactComponent as Mail } from '../../../common/svg/mail.svg';
import { ReactComponent as Users } from '../../../common/svg/users.svg';
import { ReactComponent as User } from '../../../common/svg/user.svg';
import { ReactComponent as Youtube } from '../../../common/svg/youtube.svg';
import { ReactComponent as Dashboard } from '../../../common/svg/dashboard.svg';
import { permissions } from '../../../common/utils/constants';

export const pages = {
  DASHBOARD: 'dashboard',
  VIDEOS: 'videos',
  NEWSLETTER: 'newsletter',
  USERS: 'users',
  PROFILE: 'profile'
};

const adminPages = [pages.USERS];

export type SideBarNavItemType = {
  route: string;
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  permission?: string;
};
export const SideBarNavItems: SideBarNavItemType[] = [
  {
    route: pages.DASHBOARD,
    name: 'Dashboard',
    icon: Dashboard,
    permission: permissions.DASHBOARD
  },
  {
    route: pages.VIDEOS,
    name: 'Videos',
    icon: Youtube,
    permission: permissions.VIDEOS
  },
  {
    route: pages.NEWSLETTER,
    name: 'Newsletter',
    icon: Mail,
    permission: permissions.NEWSLETTER
  },
  {
    route: pages.USERS,
    name: 'Users  ',
    icon: Users
  },
  {
    route: pages.PROFILE,
    name: 'My Profile',
    icon: User
  }
];

export const getSideBar = (permission: any, isAdmin: boolean) => {
  return SideBarNavItems.filter((navItem: SideBarNavItemType) => {
    if (navItem.permission && !permission[navItem.permission]) {
      return false;
    }
    if (!isAdmin && adminPages.includes(navItem.route)) {
      return false;
    }
    return true;
  });
};
