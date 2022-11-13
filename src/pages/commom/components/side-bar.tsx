import React, { SetStateAction } from 'react';
import { brandName } from '../../../common/utils/constants';
import { Permission } from '../../login/login.types';
import NavItem from '../components/nav-item';
import { getSideBar, SideBarNavItemType } from '../utils/utils';
import styles from './side-bar.module.scss';
import { ReactComponent as ExLinkIcon } from '../../../common/svg/external-link.svg';
import { apiUrl } from '../../../common/api-calls/config';

type SideBarProps = {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
  permission: Permission;
  isAdmin: boolean;
  isMobile: boolean;
};

const SideBar = ({ sideBarOpen, setSideBarOpen, permission, isAdmin, isMobile }: SideBarProps) => {
  const sideBarItems = getSideBar(permission, isAdmin);
  const webpage = new URL(apiUrl);
  return sideBarOpen ? (
    <div className={`side-bar ${styles.sideBarContainer}`}>
      <div onClick={() => setSideBarOpen(!sideBarOpen)} className={styles.overlay}></div>
      <div className={styles.brandContainer}>
        <span className={styles.text}>
          <span>{brandName}</span>
          <a href={`http://${webpage.host}`} target={'_blank'} rel="noreferrer">
            <ExLinkIcon className="ml-2 " color="#fff" height={15} width={15} />
          </a>
        </span>
      </div>
      <div className={styles.listcontainer}>
        {sideBarItems.map((navItem: SideBarNavItemType, index: number) => (
          <NavItem
            onClick={() => isMobile && setSideBarOpen(false)}
            key={index}
            name={navItem.name}
            route={navItem.route}
            icon={navItem.icon}
          />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SideBar;
